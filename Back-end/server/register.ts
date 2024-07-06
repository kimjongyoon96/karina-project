import express from "express";

import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env"
  ),
});

import ormConnection from "../../ORM/index";
import { getRepository } from "typeorm";

import { userinfodata } from "../../ORM/entity/userInfoEntity";

import { hashPassWord } from "./service/userPwHash";
const router = express.Router();

router.post("/api/userRegister", async (req: any, res) => {
  try {
    console.log(req.body, "클라이언트에서 보낸 바디");
    const loginType = "nonSocial";
    const { userid, userpw, useremail, userNickName, userSelectedStar } =
      req.body;
    console.log(useremail, "이멜값을보자.");

    //* 데이터베이스에 연결
    const userRepository = await ormConnection.getRepository(userinfodata);
    //* 모든 조건이 일치할때만 사용자가 있다고 판단
    const existingUser = await userRepository.findOne({
      where: {
        userId: userid,
        useremail: useremail,
        userNickName: userNickName,
        loginType: loginType,
      },
    });

    console.log(existingUser, "존재합니까?"); //* 존재하지 않으면 null값을 반환

    //* 존재하지 않으면 스킵
    if (existingUser) {
      return res.status(409).json({ message: "이미 등록된 사용자입니다." });
    }

    const hashpw = await hashPassWord(userpw);
    //* loginType 설정, naver와 google과 구분되게

    const newUser = userRepository.create({
      userId: userid,
      useremail: useremail,
      userNickName: userNickName,
      userPassWord: hashpw,
      loginType: loginType,
      selectedStar: userSelectedStar,
    });
    await userRepository.save(newUser);
    // req.session.userEmail = useremail; //* 회원가입 할때 세션에 이메일 저장
    return res
      .status(200)
      .json({ message: "회원가입이 성공적으로 이루어졌습니다." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "회원가입 등록에서 에러가 발생했습니다." });
  }
});

export default router;
