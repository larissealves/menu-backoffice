import pg from 'pg'
import envConf from '../../config/envConf.js';

const { Pool, Client } = pg
const connectionString = envConf.dataBaseUrlLogin;

 
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  sslnegotiation: 'direct',
})
 
//await pool.query('SELECT NOW()')
//await pool.end()


export default pool;