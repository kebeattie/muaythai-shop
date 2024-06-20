//Set up DB connection
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'password',
    port: 5432
});




module.exports =  pool;
