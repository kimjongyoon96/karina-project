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
import { userInfoData } from "../ORM/entity/userInfoEntity";
const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

router.post("/api/loginCheck", async (req: any, res) => {
  try {
    console.log(req.body, "로그인 클라이언트에서 보낸 바디");
    const { inputId, inputPw } = req.body;
    const loginType = "nonSocial";
    const userRepository = await ormConnection.getRepository(userInfoData);
    const existUser = await userRepository.findOne({
      where: {
        userId: inputId,
        loginType: loginType,
      },
    });
    if (!existUser) {
      return res.status(409).json({ message: "DB에 회원정보가 없습니다." });
    }
    const isMatch = await verifyPassword(inputPw, existUser.userPassWord);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
    //* 여기까지 왔으면, DB에 정보가 있다고 판단, JWT 발급
    // const useremail = req.session.useremail;
    const token = jwt.sign(
      {
        userid: inputId,
        userName: undefined,
        userEmail: existUser.useremail,
        loginType: loginType,
      },
      secretKey,
      {
        expiresIn: "5h",
      }
    );
    console.log(token, "아이디 로직시 토큰");
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(200).json({ message: "로그인 성공" });
  } catch (error) {
    console.error(error, "로그인 확인 서버쪽 에러가 발생했습니다.");
    res.status(500).json({ message: "로그인 체크에서 에러가 발생했습니다." });
  }
});

export default router;
