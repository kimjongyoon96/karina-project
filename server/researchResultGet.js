const express = require("express");
const router = express.Router();
const pool = require("./db");

//* 검색을 했을때 필요한 라우터
router.get("/api/research", async (req, res) => {
  try {
    console.log(req.query, "검색쪽쿼리입니다..");
    let baseQuery = "SELECT * FROM karina";
    let conditions = [];
    if (req.query.search) {
      baseQuery += " WHERE title LIKE $1";
      conditions.push(`%${req.query.search}%`);
    }
    if (req.query.page || req.query.limit) {
      let page = parseInt(req.query.page, 10) || 1;
      let limit = parseInt(req.query.limit, 10) || 8;
      let offset = (page - 1) * limit;
      baseQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const { rows } = await pool.query(baseQuery, conditions);
    console.log(rows, "검색결과 로우스");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("/api/research 서버쪽 에러났다.");
  }
});

module.exports = router;
