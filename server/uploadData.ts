import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { userPost } from "../ORM/entity/userPostEntity";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import jwt from "jsonwebtoken";

const router = express();

router.get("/api/karina", async (req: any, res) => {
  try {
    // 요청에서 쿼리스트링 파라미터를 추출
    const { menubar, page, limit } = req.query;

    // TypeORM에서 사용할 쿼리 조건 객체
    const whereConditions = {};
    if (menubar) {
      whereConditions["menubar"] = menubar;
    }

    // 페이징 처리를 위한 옵션
    const take = limit ? parseInt(limit, 10) : 10;
    const skip = page ? (parseInt(page, 10) - 1) * take : 0;

    // TypeORM을 사용하여 데이터 조회
    const userPostRepository = ormConnection.getRepository(userPost);
    const posts = await userPostRepository.find({
      where: whereConditions,
      take,
      skip,
    });

    res.json(posts);
    // console.log(posts, "페이지네이션 결과값");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
