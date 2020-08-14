import { Request, Response } from 'express';
import db from '../database/connections';

export default class ConnectionsController {
    async index(request: Request, response: Response){
        const totalConnections = await db('connections').count('* as total'); //take on table connections a count of every connections on there

        const { total } = totalConnections[0]; //this is necessary because the knex methods ever returns arrays, so you need to take the first position even when just one result.

        return response.json({ total });// the total is inside {} to the return to be sent like a object shape
    }

    async create(request: Request, response: Response) {
        const { user_id } = request.body;

        await db('connections').insert({
            user_id,
        });

        return response.status(201).send();
    }
}