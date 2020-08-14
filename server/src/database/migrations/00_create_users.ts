import Knex from 'knex';

export async function up(knex: Knex) { //here we put what changes want to do 
    return knex.schema.createTable('users', table => { //more info knexjs.org migration API
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

export async function down(knex: Knex){ //here we put how to undo the changes of up()
    return knex.schema.dropTable('users');
}                               