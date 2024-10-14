import pg from 'pg';
const {Pool}= pg;

const pool = new Pool({
    host: "localhost", // or wherever the db is hosted
    user: "ashmit",
    database: "pokemon",
    password: "ashmit",
    port: 5432 // The default port
  });

export default pool;