import Knex from 'knex';

export async function up(knex: Knex) { //here we put what changes want to do 
    return knex.schema.createTable('connections', table => { //more info knexjs.org migration API
        table.increments('id').primary();


        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') 
            .onDelete('CASCADE'); 
        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down(knex: Knex){ //here we put how to undo the changes of up()
    return knex.schema.dropTable('connections');
}              