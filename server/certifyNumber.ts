import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";

const router = express.Router();

router.post("/api/certifyNumber", (req: any, res) => {
  try {
    const { inputNumber } = req.body;

    if (inputNumber === req.session.authcode) {
      res.json({ message: "인증에 성공했습니다.", success: true });
    } else {
      res.json({ message: "인증에 실패했습니다." });
    }
  } catch (error) {
    res.status(401).json({ message: "인증넘버 서버 에러입니다." });
  }
});

export default router;
