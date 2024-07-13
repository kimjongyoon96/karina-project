import express from "express";
import ormConnection from "../../ORM/index";
import { getRepository } from "typeorm";
import { userinfodata } from "../../ORM/entity/userInfoEntity";
import { verifyToken } from "./jwt";
import { Request } from "express";

const router = express();
type users = {
  userEmail: string;
  identifier: string;
  loginType: string;
};
interface CustomRequest extends Request {
  user?: users;
}
//* 소셜 로그인시 닉네임 받는 라우터
router.post(
  "/api/addNickName",
  verifyToken,
  async (req: CustomRequest, res) => {
    try {
      const { nickName, selectedStar } = req.body; //* 닉네임 클라이언트 인풋태그
      const { userEmail, identifier, loginType } = req.user as users;

      if (!nickName || !identifier) {
        return res
          .status(400)
          .json({ message: "닉네임과 유저인포가 존재하지 않습니다." });
      }
      //* 유저인포 데이타를 불러옴니다
      const userentity = await ormConnection.getRepository(userinfodata);

      const User = await userentity.findOne({
        where:
          loginType === "nonSocial"
            ? { userId: identifier, useremail: userEmail }
            : { username: identifier, useremail: userEmail },
      });
      //* 유저가 있다면, 닉네임컬럼에 닉네임을 저장합니다.
      if (User) {
        User.userNickName = nickName;
        User.selectedStar = selectedStar;
        await userentity.save(User);
        return res
          .status(200)
          .json({ message: "닉네임이 성공적으로 추가되었습니다." });
      }
    } catch (error) {
      console.error(error, "닉네임 post 서버쪽 에러입니다.");
      res.status(500).json({ message: "닉네임 서버 에러 발생" });
    }
  }
);

export default router;
