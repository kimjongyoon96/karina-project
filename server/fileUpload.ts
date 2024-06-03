import express from "express";
import { S3 } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { verifyToken } from "./jwt";

import { userPost } from "../ORM/entity/userPostEntity";
import { userLike } from "../ORM/entity/userLikeEntity";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import { userComment } from "../ORM/entity/userCommentsEntity";

const router = express.Router();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("키값이 존재하지 않습니다.");
}
const s3 = new S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
// s3, 사진 게시물 업로드용
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "karinas",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});
router.post(
  "/api/upload",
  verifyToken,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "photoSumnail", maxCount: 1 },
  ]),
  async (req: any, res) => {
    try {
      const { userEmail, loginType, identifier } = req.user;
      const userRepository = ormConnection.getRepository(userInfoData); //* 유저정보 가져옴
      const user = await userRepository.findOne({
        where:
          loginType === "nonSocial"
            ? { userId: identifier, useremail: userEmail }
            : { username: identifier, useremail: userEmail },
      });
      if (!user) {
        console.log("업로드 하기 위한 유저정보가 존재하지 않습니다.");
        return res.status(404).json({ message: "사용자 찾을수가 없어" });
      }
      console.log(user, "조회된 사용자 정보");
      const UserPost = new userPost();
      UserPost.uuid = req.body.id;
      UserPost.menubar = req.body.menubar;
      UserPost.title = req.body.title;
      UserPost.photosumnail = req.files["photoSumnail"][0].location;
      UserPost.photos = req.files["photos"].map((photo) => photo.location);
      UserPost.userNickName = user.userNickName;
      //* 유저와 게시물 연결
      UserPost.socialUser = user; //
      const userPostRepository = ormConnection.getRepository(userPost);
      await userPostRepository.save(UserPost);
      console.log(UserPost, "업로드한것입니다.");

      res.status(200).json({
        message: "정상적으로 게시물이 업로드 되었습니다.",
        data: { UserPost },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "업로드 에러입니다. 서버쪽 확인하세요" });
    }
  }
);

export default router;
