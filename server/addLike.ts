import express from "express";
import { verifyToken } from "./jwt";
import ormConnection from "../ORM";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import { userLike } from "../ORM/entity/userLikeEntity";
const router = express.Router();

router.post("/api/like", verifyToken, async (req: any, res) => {
  try {
    const { postuuid } = req.body;
    const { identifier, userEmail, loginType } = req.user;

    console.log(postuuid, "포스트유유아이디");
    console.log(identifier, "좋아요 할때 아이디 혹은 유저이름값");

    const findUserInfo = ormConnection.getRepository(userInfoData);
    const userInfoMatch = await findUserInfo.findOne({
      where:
        loginType === "nonSocial"
          ? { userId: identifier, useremail: userEmail }
          : { username: identifier, useremail: userEmail },
    });
    if (!userInfoMatch) {
      return res
        .status(404)
        .json({ message: "좋아요를 위한 유저 정보가 존재하지 않습니다." });
    }

    const UserLike = new userLike();
    UserLike.postid = postuuid;

    if (loginType === "nonSocial") {
      UserLike.userId = identifier; // non소셜 로그인 아이디 문자열
      console.log("nonSocial 로그인:", UserLike.userId);
    } else {
      UserLike.username = identifier; // 소셜 로그인
      console.log("socialLogin:", UserLike.username);
    }

    const userPostRepository = ormConnection.getRepository(userLike);
    await userPostRepository.save(UserLike);
    res.status(200).json({ message: "추천이 정상적으로 되었습니다." });
  } catch (error) {
    console.error("에러가 발생, 좋아요 로직 이상 서버", error);
    if (!res.headersSent) {
      res.status(500).send("전송 실패");
    }
  }
});

export default router;
