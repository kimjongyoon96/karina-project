import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { hashPassWord } from "./service/userPwHash";
import ormConnection from "../ORM/index";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { userInfoData } from "../ORM/entity/userInfoEntity";
const router = express.Router();
router.post("/api/changePw", async (req: any, res) => {
  try {
    const { usernewPw } = req.body;
    console.log(usernewPw, "클라이언트에서 받음 비밀번호");
    // const userInputId = req.session.authUserId; // 세션에 있는 유저 아이디;
    // console.log(userInputId, "세션에 저장되어있는 아이디");
    // if (!userInputId) {
    //   return res.json({ message: "세션이 만료되었습니다." });
    // }
    const hashPw = await hashPassWord(usernewPw); // 해싱한 새로운 유저 비밀번호
    console.log("test1");
    const userRepository = ormConnection.getRepository(userInfoData);

    const existUser = await userRepository.findOne({
      where: {
        userId: req.session.authUserId,
      },
    });
    console.log("test2");

    if (!existUser) {
      return res.status(401).json({ message: "사용자가 없습니다!" });
    }
    console.log("test3");

    existUser.userPassWord = hashPw; // 받은 새 비번으로 할당
    await userRepository.save(existUser);
    return res.json({
      message: "업데이트가 정상적으로 되었습니다.",
      success: true,
    });
  } catch (error) {
    console.error(error, "새로운 비밀번호 업데이트 에러");
    return res.status(500).json({ message: "비밀번호 업데이트 실패" });
    console.log("test4");
  }
});

export default router;
