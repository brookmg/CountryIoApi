const Knex = require('knex')

const knex = Knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'toor',
        database : 'countryiotest'
      }
})

exports.Knex = knex;


