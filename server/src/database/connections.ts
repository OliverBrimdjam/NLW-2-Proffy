import knex from 'knex'; //this lib import will translate sql query to JS
import path from 'path'; //this will manage adress path like '/' or '\' in paths 

//migrations - controlam as versões do banco de dados

const db = knex({
    client: 'sqlite3', //postgres, oracle, mysql
    connection:{
        filename: path.resolve(__dirname,  'database.sqlite') //here there the local where file db will be placed
    },
    useNullAsDefault: true, //sqlite do not know what put in void inputs, here we configure 'null' like std

})

export default db;