import express from "express";
import { userComment } from "../ORM/entity/userCommentsEntity";
import ormConnection from "../ORM";
const router = express.Router();

router.get("/api/viewComments/:postuuid", async (req: any, res) => {
  try {
    const { postuuid } = req.params;
    console.log(postuuid, "파라미터에서 추출한 UUID");

    const comments = await ormConnection.getRepository(userComment).find({
      where: { postuuid: postuuid },
      select: ["userNickName", "text"],
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("댓글 불러오는데 에러났다", error);
    res.status(500).json({ message: "댓글을 불러올수 없습니다." });
  }
});

export default router;
