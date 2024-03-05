// db.js
const { Pool } = require("pg");
require("dotenv").config();

//* db 연결 정보 모듈화
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = pool;
