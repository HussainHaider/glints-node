const Pool = require('pg-pool')
const dotenv = require('dotenv');

dotenv.config();
console.log('process.env')
console.log(process.env)
console.log(process.env.DATABASE_URL)
const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

module.exports =  pool;