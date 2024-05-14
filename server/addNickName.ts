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

//* 소셜 로그인시 닉네임 받는 요소
router.post("/api/addNickName", async (req: any, res) => {
  try {
    const { nickName, username } = req.body;
    const userentity = await ormConnection.getRepository(userInfoData);
    const User = await userentity.findOne({ where: { id: username } });
    if (User) {
      User.userNickName = nickName;
      await userentity.save(User);
      res.status(200).json({ message: "닉네임이 성공적으로 추가되었습니다." });
    }
    return res.redirect(`${process.env.CLIENT_API_URL}`);
  } catch (error) {
    console.error(error, "닉네임 post 서버쪽 에러입니다.");
    res.status(500).json({ message: "닉네임 서버 에러 발생" });
  }
});

export default router;
