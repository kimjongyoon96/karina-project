import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { userPost } from "../ORM/entity/userPostEntity";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { hashPassWord } from "../src/services/userPwHash";

const router = express.Router();

router.post("/api/userRegister", async (req, res) => {
  try {
    console.log(req.body, "클라이언트에서 보낸 바디");

    const { userid, userpw, useremail, userNickName } = req.body;
    console.log(req.body, "유저회원가입데이터");
    const userRepository = await ormConnection.getRepository(
      nonSocialUserInfoData
    );
    const existingUser = await userRepository.findOne({
      where: [
        { userid: userid },
        { useremail: useremail },
        { userNickName: userNickName },
      ],
    });
    if (existingUser) {
      return res.status(409).json({ message: "이미 등록된 사용자입니다." });
    }
    const hashpw = await hashPassWord(userpw);

    const newUser = userRepository.create({
      userid,
      useremail,
      userNickName,
      userPassWord: hashpw,
    });
    await userRepository.save(newUser);
    res.status(200).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "회원가입 등록에서 에러가 발생했습니다." });
  }
});

export default router;
