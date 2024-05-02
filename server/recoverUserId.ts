import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import eamilsend from "./emailSend";
import { ormConnection } from "../ORM";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { hashPassWord, verifyPassword } from "../src/services/userPwHash";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/recoverId", async (req, res) => {
  try {
    console.log(req.body, "클라이언트가 서버로 보낸 회원정보찾기");
    const { inputEmail } = req.body;
    const userRepository = ormConnection.getRepository(nonSocialUserInfoData);
    const existUser = await userRepository.findOne({
      where: {
        useremail: inputEmail,
      },
    });
    if (!existUser) {
      return res.status(409).json({ message: "찾을 ID가 존재하지 않습니다." });
    } else {
      const emailResult = await eamilsend({
        from: `${process.env.GOOGLE_ID}`,
        to: `${inputEmail}`,
        subject: "당신의 아이디를 보내드립니다.",
        text: `귀하의 아이디는 ${existUser.userid} 입니다.`,
      });
      if (emailResult.success) {
        console.log("Notification sent successfully");
      } else {
        console.log("Failed to send notification", emailResult.error);
      }
    }
    res.json({ message: "잘받았다." });
  } catch (error) {
    console.error(error, "회원정보 찾기 에러입니다.");
    res.status(500).json({ message: "회원정보 찾기에서 에러가 발생했습니다." });
  }
});

export default router;