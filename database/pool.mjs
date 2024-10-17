import pg from 'pg';
const {Pool}= pg;
import { config } from 'dotenv';
config();

const {
  HOST,
  USER,
  DB,
  PASSWORD,
  DB_PORT,
}=process.env;



const pool = new Pool({
    host: HOST,
    user: PASSWORD,
    database: DB,
    password: PASSWORD,
    port: DB_PORT
  });

export default pool;