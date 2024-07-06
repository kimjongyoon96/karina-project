import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env"
  ),
});
import { listFilesInFolder } from "./service/renderImage";
import ormConnection from "../../ORM/index";
import { getRepository } from "typeorm";
import { userpost } from "../../ORM/entity/userPostEntity";
import { userLike } from "../../ORM/entity/userLikeEntity";
import { userComment } from "../../ORM/entity/userCommentsEntity";
import { userinfodata } from "../../ORM/entity/userInfoEntity";
const router = express.Router();

router.get("/api/research", async (req: any, res: Response) => {
  try {
    //* 쿼리스트링 객체 추출
    const { search, page, limit } = req.query;
    const folder = "메뉴바";
    const sendImage = await listFilesInFolder(folder);
    console.log(search, page, limit);
    const whereSearch = {};
    if (search) {
      whereSearch["title"] = search;
    }

    //* 엔티티 연결
    const researchRnderThing = ormConnection.getRepository(userpost);

    const take = limit ? parseInt(limit, 10) : 10; // 한 페이지에 보여질 항목의 수
    console.log(take, "테이크다운");
    const skip = page ? (parseInt(page, 10) - 1) * take : 0; // 건너뛸 항목 수
    console.log(skip, "스킵하지마세요");
    // TypeORM의 조건에 맞게 쿼리 생성
    const existUser = await researchRnderThing.find({
      where: whereSearch,
      take, // 한 페이지에 보여질 항목의 수
      skip, // 건너뛸 항목 수
    });

    const userLikeRepository = ormConnection.getRepository(userLike);
    const userComments = ormConnection.getRepository(userComment);
    const userInfoRepository = ormConnection.getRepository(userinfodata);
    const postMap = await Promise.all(
      existUser.map(async (post) => {
        const likeCount = await userLikeRepository.count({
          where: { postid: post.uuid },
        });
        const userInfo = await userInfoRepository.findOne({
          where: {
            userNickName: post.userNickName,
          },
        });

        const s3Url = userInfo
          ? sendImage.find(
              (item) => item.key?.includes(userInfo.selectedStar.slice(0, 4))
            )?.URL
          : null;
        const CommentCount = await userComments.count({
          where: { postuuid: post.uuid },
        });

        return {
          ...post,
          likeCount,
          CommentCount,
          s3Url,
        };
      })
    );
    return res.status(200).json(postMap);
    // return res.status(200).json({ message: "검색 잘 받음", existUser });
  } catch (error) {
    console.error(error, "검색결과 서버 에러");
    res.status(401).json({ message: "검색 서버쪽 에러났으니까 확인" });
  }
});

export default router;
