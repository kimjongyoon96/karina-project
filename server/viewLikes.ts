import express from "express";
import { verifyToken } from "./jwt";
import ormConnection from "../ORM/index";
import { userLike } from "../ORM/entity/userLikeEntity";

const router = express.Router();
//* 모듈화 후보 4 -> 좋아요 보기 로직 => ORM 리팩터링
router.get("/api/viewLikes/:postuuid", verifyToken, async (req: any, res) => {
  try {
    const { postuuid } = req.params;
    console.log(postuuid, "좋아요 갯수의 req.params 로직");
    const { identifier, userEmail, loginType } = req.user;

    //* 전체 좋아요 수
    const totalLikesCount = await ormConnection
      .getRepository(userLike)
      .createQueryBuilder("like")
      .where("like.postid = :postid", { postid: postuuid })
      .getCount();

    // 현재 사용자가 좋아요를 눌렀는지 확인합니다.
    const whereConditon =
      loginType === "nonSocial"
        ? { userId: identifier, useremail: userEmail }
        : { username: identifier, useremail: userEmail };
    const userLikeCount = await ormConnection
      .getRepository(userLike)
      .createQueryBuilder("like")
      .where("like.postid = :postid AND like.username = :username", {
        postid: postuuid,
        username: whereConditon,
      })
      .getCount();

    res.json({
      userLiked: userLikeCount, // 좋아요 수가 0보다 크면 현재 사용자가 좋아요를 누른 것으로 간주합니다.
    });
  } catch (error) {
    console.error(" 좋아요 서버 에러 확인 하라", error);
    return res.status(500).json({ message: "좋아요 에러입니다," });
  }
});

export default router;
