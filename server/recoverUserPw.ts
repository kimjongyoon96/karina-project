import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { hashPassWord, verifyPassword } from "../src/services/userPwHash";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/recoverPw", async (req, res) => {
  try {
    console.log(req.body, "클라이언트가 보낸 pw정보");
    res.json({ message: "잘받았다." });
  } catch (error) {
    console.error(error, "pw 찾기에 대한 에러입니다.");
    res.status(500).json({ message: "pw 찾기에 대한 경고입니다." });
  }
});

export default router;
