import express from "express";
import ormConnection from "../../ORM";
import { userpost } from "../../ORM/entity/userPostEntity";

const router = express();

router.post("/api/postView", async (req: any, res) => {
  const findUuid = req.query.postuuid;
  console.log(findUuid);
  console.log("세션이있나?", req.session);
  try {
    const repo = ormConnection.getRepository(userpost);

    const post = await repo.findOne({
      where: {
        uuid: findUuid,
      },
    });

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    if (!req.session.viewedPosts) {
      req.session.viewedPosts = [];
      console.log("빈배열:", req.session.viewedPosts);
    }
    if (!req.session.viewedPosts.includes(findUuid)) {
      req.session.viewedPosts.push(findUuid);
      console.log("Updated viewedPosts:", req.session.viewedPosts);
      post.postView = (post.postView || 0) + 1;
      await repo.save(post);
    } else {
      console.log("UUID already viewed:", findUuid);
    }
    req.session.save((error) => {
      if (error) {
        console.log("에러발생", error);
      } else {
        console.log(req.session, "정상저장");
      }
    });
    return res
      .status(200)
      .send({ message: "View count incremented", views: post.postView });
  } catch (error) {
    res.status(500).json({ message: "조회수 라우터 연결 불가" });
  }
});

export default router;
