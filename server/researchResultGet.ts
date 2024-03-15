import express, { Request, Response } from "express";
import pool from "./db"; // ./db 모듈의 실제 경로와 타입에 따라 조정이 필요합니다.

const router = express.Router();

// 검색을 했을 때 필요한 라우터
router.get("/api/research", async (req: Request, res: Response) => {
  try {
    console.log(req.query, "검색쪽쿼리입니다..");
    let baseQuery = "SELECT * FROM karina";
    let conditions: string[] = [];
    if (req.query.search) {
      baseQuery += " WHERE title LIKE $1";
      conditions.push(`%${req.query.search}%`);
    }
    if (req.query.page || req.query.limit) {
      let page = parseInt(req.query.page as string, 10) || 1;
      let limit = parseInt(req.query.limit as string, 10) || 8;
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

export default router;
