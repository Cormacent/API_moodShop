const { Pool } = require('pg');

const db = new Pool({
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
});

module.exports = db;
