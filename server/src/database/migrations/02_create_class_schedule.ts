import Knex from 'knex';

export async function up(knex: Knex) { //here we put what changes want to do 
    return knex.schema.createTable('class_schedule', table => { //more info knexjs.org migration API
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE') // if this user_id was changed every classes with it will change too
            .onDelete('CASCADE'); //if the teacher was deleted every classes with him will go too
    });
}

export async function down(knex: Knex){ //here we put how to undo the changes of up()
    return knex.schema.dropTable('class_schedule');
}                               