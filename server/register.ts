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

import { hashPassWord } from "../src/services/userPwHash";
const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

router.post("/api/userRegister", async (req: any, res) => {
  try {
    console.log(req.body, "클라이언트에서 보낸 바디");

    const { userid, userpw, useremail, userNickName } = req.body;
    req.session.useremail = useremail; //* 회원가입 할때 세션에 이메일 저장
    //* nonsocial 유저 있는지 확인
    const userRepository = await ormConnection.getRepository(userInfoData);
    //* 모든 조건이 일치할때만 사용자가 있다고 판단
    const existingUser = await userRepository.findOne({
      where: {
        userId: userid,
        useremail: useremail,
        userNickName: userNickName,
      },
    });

    console.log(existingUser, "존재합니까?"); //* 존재하지 않으면 null값을 반환

    //* 존재하지 않으면 스킵
    if (existingUser) {
      return res.status(409).json({ message: "이미 등록된 사용자입니다." });
    }

    const hashpw = await hashPassWord(userpw);
    //* loginType 설정, naver와 google과 구분되게
    const loginType = "nonSocial";

    const newUser = userRepository.create({
      userId: userid,
      useremail: useremail,
      userNickName: userNickName,
      userPassWord: hashpw,
      loginType: loginType,
    });
    await userRepository.save(newUser);

    return res
      .status(200)
      .json({ message: "회원가입이 성공적으로 이루어졌습니다." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "회원가입 등록에서 에러가 발생했습니다." });
  }
});

export default router;
