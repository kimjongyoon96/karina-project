import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import ormConnection from "../ORM/index";
import { getRepository } from "typeorm";
import { userPost } from "../ORM/entity/userPostEntity";
const router = express.Router();

router.get("/api/research", async (req: any, res: Response) => {
  try {
    //* 쿼리스트링 객체 추출
    const { search, page, limit } = req.query;

    console.log(search, page, limit);
    const whereSearch = {};
    if (search) {
      whereSearch["title"] = search;
    }

    //* 엔티티 연결
    const researchRnderThing = ormConnection.getRepository(userPost);

    const take = limit ? parseInt(limit, 10) : 10; // 한 페이지에 보여질 항목의 수
    console.log(take, "테이크다운");
    const skip = page ? (parseInt(page, 10) - 1) * take : 0; // 건너뛸 항목 수
    console.log(skip, "스킵하지마세요");
    // TypeORM의 조건에 맞게 쿼리 생성
    const existUser = await researchRnderThing.find({
      where: whereSearch,
      take, // 한 페이지에 보여질 항목의 수
      skip, // 건너뛸 항목 수
    });
    res.json(existUser);
    // return res.status(200).json({ message: "검색 잘 받음", existUser });
  } catch (error) {
    console.error(error, "검색결과 서버 에러");
    res.status(401).json({ message: "검색 서버쪽 에러났으니까 확인" });
  }
});

export default router;
