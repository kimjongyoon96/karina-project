import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { userPost } from "../ORM/entity/userPostEntity";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import { verifyToken } from "./jwt";

const router = express();

//* 소셜 로그인시 닉네임 받는 요소
router.post("/api/addNickName", verifyToken, async (req: any, res) => {
  try {
    const { nickName } = req.body; //* 닉네임 클라이언트 인풋태그
    const { userName } = req.user; //* 유저이름 JWT에서 추출
    console.log(nickName, userName, "각각 닉네임과 유저이름(JWT)");

    if (!nickName || !userName) {
      return res.status(400).json({ message: "닉네임과 유저이름이 없어요" });
    }
    //* 유저인포 데이타를 불러옴니다
    const userentity = await ormConnection.getRepository(userInfoData);
    //* jwt 페이로드에 추출한 유저이름에 맞는 테이블을 찾습니다.
    const User = await userentity.findOne({
      where: { username: userName },
    });
    //* 유저가 있다면, 닉네임컬럼에 닉네임을 저장합니다.
    if (User) {
      User.userNickName = nickName;
      await userentity.save(User);
      return res
        .status(200)
        .json({ message: "닉네임이 성공적으로 추가되었습니다." });
    }
  } catch (error) {
    console.error(error, "닉네임 post 서버쪽 에러입니다.");
    res.status(500).json({ message: "닉네임 서버 에러 발생" });
  }
});

export default router;
