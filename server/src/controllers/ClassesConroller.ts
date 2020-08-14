import { Request, Response } from 'express';
import db from '../database/connections';
import convertHourToMinutes from '../utils/convertHourToMinutes';


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
        .whereExists(function() {
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes] )
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes] )
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

        return response.json(classes); 
    }

    async create(request: Request, response: Response) { //need to put async to use await on db().insert()
        const {                                            //receiving data from body request each column in your own variable (destructure)
            name, 
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;                                   //request.body is the part of http that have the request content
    
        const trx = await db.transaction();                 //transaction control the flow to insert all the tables at the same time to db avoiding an possible error to break the process
    
    
        try{                                                     //here we made a error handle with try{}catch(){}
            const insertedUsersIds = await trx('users').insert({ // the await will say to node to wait this action end to go ahead
                name,                                           //this code insert on users table the following columns
                avatar,                                         // the columns names is writed by short syntax of JS
                whatsapp,                                       //this query returns the id of the inserted user/users
                bio,
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => { //the data about time comes in string format and need to be converted to minutes
                return{                                                          //to be stored like integer into db, this method can do that conversion    
                    class_id,                                              
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return response.status(201).send(); // response.send() - returns a sucess | status(201) - means sucess status
        } catch(err){
            console.log(err);
            
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}