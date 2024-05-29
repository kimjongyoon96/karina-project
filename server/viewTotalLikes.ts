import express from "express";
import ormConnection from "../ORM";
import { userLike } from "../ORM/entity/userLikeEntity";

const router = express.Router();
//* 모듈화 후보 4 -> 좋아요 보기 로직 => ORM 리팩터링
router.get("/api/totalViewLikes/:postuuid", async (req: any, res) => {
  try {
    const { postuuid } = req.params;
    console.log(postuuid, "좋아요 갯수의 req.params 로직");

    //* 전체 좋아요 수
    const totalLikesCount = await ormConnection
      .getRepository(userLike)
      .createQueryBuilder("like")
      .where("like.postid = :postid", { postid: postuuid })
      .getCount();

    res.json({
      totalLikes: totalLikesCount,
    });
  } catch (error) {
    console.error(" 좋아요 서버 에러 확인 하라", error);
    return res.status(500).json({ message: "좋아요 에러입니다," });
  }
});

export default router;
