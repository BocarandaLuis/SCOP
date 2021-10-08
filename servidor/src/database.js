const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '25342581',
    database: 'promacol',
    port: '5432'
})


module.exports = db;