import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env"
  ),
});

import ormConnection from "../../ORM/index";
import { userpost } from "../../ORM/entity/userPostEntity";
import { getRepository } from "typeorm";
import { listFilesInFolder } from "./service/renderImage";
import { userLike } from "../../ORM/entity/userLikeEntity";
import { userinfodata } from "../../ORM/entity/userInfoEntity";
import { verifyToken } from "./jwt";
import { findDOMNode } from "react-dom";
import { userComment } from "../../ORM/entity/userCommentsEntity";

const router = express();

router.get("/api/karina", async (req: any, res) => {
  try {
    // 요청에서 쿼리스트링 파라미터를 추출
    const { menubar, page, limit } = req.query;
    console.log(menubar, page);
    const folder = "메뉴바";
    const sendImage = await listFilesInFolder(folder);
    console.log("메뉴바의 해당하는 폴더내용:", sendImage);

    // TypeORM에서 사용할 쿼리 조건 객체
    const whereConditions = {};
    if (menubar) {
      whereConditions["menubar"] = menubar;
    }

    // 페이징 처리를 위한 옵션
    const take = limit ? parseInt(limit, 10) : 10;
    const skip = page ? (parseInt(page, 10) - 1) * take : 0;

    // TypeORM을 사용하여 데이터 조회
    const userPostRepository = ormConnection.getRepository(userpost);
    const posts = await userPostRepository.find({
      where: whereConditions,
      take,
      skip,
    });
    const userInfoRepository = ormConnection.getRepository(userinfodata);
    //* 1. 좋아요 레포지토리를 불러온다.
    const userLikeRepository = ormConnection.getRepository(userLike);
    const userComments = ormConnection.getRepository(userComment);
    //* 2. postsMap을 선언, 좋아요 레포지토리에서 postid 컬럼에 post.uuid 즉, 게시물에 해당하는
    //* 좋아요 postid를 가져온다.
    //* 3. 스프레드 연산자를 사용, post를 쫙 펼치고, likeCount를 추가한 객체를 생성한다.
    const postsMap = await Promise.all(
      posts.map(async (post) => {
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
        console.log("유저페이보릿", userInfo);
        const likeCount = await userLikeRepository.count({
          where: { postid: post.uuid },
        });

        const commentCount = await userComments.count({
          where: { postuuid: post.uuid },
        });

        return {
          ...post,
          likeCount,
          s3Url,
          commentCount,
        };
      })
    );

    console.log("map돌린거:", postsMap);
    console.log("쿼리빌더 적용 데이터", posts);
    return res.status(200).json(postsMap);
  } catch (err) {
    console.error(err);
    res.status(500).send("게시물을 가져오는데 실패했습니다.");
  }
});

export default router;
