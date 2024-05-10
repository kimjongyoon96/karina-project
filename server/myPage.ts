import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { hashPassWord, verifyPassword } from "../src/services/userPwHash";
import { userPost } from "../ORM/entity/userPostEntity";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import { verifyToken } from "./jwt";

const router = express.Router();

router.get("/api/myThings", verifyToken, async (req: any, res) => {
  const { type } = req.query;
  const { userName, userEmail } = req.user;
  console.log(userName, userEmail); //* 유저의 client로 부터 JWT 페이로드 해석
  //* 유저의 인포데이터 엔티티를 가져온다.

  try {
    switch (type) {
      case "myWrite":
        const myInfoRepository =
          await ormConnection.getRepository(userInfoData);
        const user = await myInfoRepository.findOne({
          where: { username: userName },
          relations: ["socialPosts"],
        });
        console.log(user?.socialPosts, "뭐가나오나");

        if (!user) {
          return res
            .status(404)
            .json({ message: "유저가 쓴 게시물이 없습니다." });
        }
        res.json(user.socialPosts);
        break;
      case "myComments":
        res.json({ message: "die를 입력했군.. 킄극" });
        break;
      case "myLikes":
        res.json({ message: "좋아요 게시물을 눌렀꾼.. 큭큭" });
      default:
        res.json({ message: "정체를 알수없다.. 큭큭" });
    }
  } catch (error) {
    res.status(400).json({ message: "잘못되었다." });
  }
});

export default router;
