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

router.post("/api/userRegister", async (req, res) => {
  try {
    console.log(req.body, "클라이언트에서 보낸 바디");

    const { userid, userpw, useremail, userNickName } = req.body;
    //* nonsocial 유저 있는지 확인
    const userRepository = await ormConnection.getRepository(userInfoData);
    const existingUser = await userRepository.findOne({
      where: {
        userId: userid,
        useremail: useremail,
        userNickName: userNickName,
      },
    });
    if (existingUser) {
      return res.status(409).json({ message: "이미 등록된 사용자입니다." });
    }
    const hashpw = await hashPassWord(userpw);

    const newUser = userRepository.create({
      userId: userid,
      useremail: useremail,
      userNickName: userNickName,
      userPassWord: hashpw,
      isSocial: false,
    });
    await userRepository.save(newUser);
    const token = jwt.sign(
      {
        userId: userid,
        userEmail: useremail,
      },
      secretKey,
      { expiresIn: "5h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "회원가입 등록에서 에러가 발생했습니다." });
  }
});

export default router;
