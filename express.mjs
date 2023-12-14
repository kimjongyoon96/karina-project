// server.js
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = 3004;

const pool = new Pool({
  user: 'postgres', // PostgreSQL 사용자 이름
  host: 'db', // PostgreSQL 서버 주소
  database: 'postgres', // 사용할 데이터베이스 이름
  password: 'dkrlaos1', // PostgreSQL 사용자 비밀번호
  port: 5432 // PostgreSQL 서버 포트
});

app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
  try {
    const queryResult = await pool.query(
      "SELECT * FROM mytable WHERE name = 'Alice'"
    );
    console.log(queryResult);
    console.log(queryResult.rows);
    res.json(queryResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '에러떳따라따따따따' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
