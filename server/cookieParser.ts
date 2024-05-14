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

router.get("/auth/cookie", (req, res) => {
  const token = req.cookies.token; // 쿠키에서 토큰 읽기
  console.log("쿠키의 토큰:", token);

  if (token) {
    try {
      console.log("ath/cookie에 대한 응답입니다.", token);
      res.json({ token });
    } catch (error) {
      console.error("쿠키에 있는 토큰 에러:", error.message);
      res.clearCookie("token");
      return res
        .status(403)
        .json({ message: "토큰이 유효하지 않거나, 만료되었습니다." });
    }
  } else {
    res.status(404).send({ message: "토큰이 존재하지 않습니다." });
  }
});

export default router;
