import express from "express";
import { verifyToken } from "../jwt";
import ormConnection from "../../ORM";
import { userInfoData } from "../../ORM/entity/userInfoEntity";
const router = express.Router();

router.post("/api/usersInfo", verifyToken, async (req: any, res) => {
  const { userName, userEmail, loginType } = req.user; // jwt 토큰값
  console.log(userName, userEmail, loginType);

  try {
    const isUserExgist = ormConnection.getRepository(userInfoData);
    if (!isUserExgist) {
      return res
        .status(404)
        .json({ message: "DB에 연결하는데에 실패했습니다." });
    }
    const findUserInfo = await isUserExgist.findOne({
      where: {
        username: userName,
        useremail: userEmail,
        loginType: loginType,
      },
    });
    if (!findUserInfo) {
      return res
        .status(403)
        .json({ message: "해당 유저를 찾을수가 없습니다." });
    }
    //* 조건에 맞는 데이터를 해당 엔티티에서 추출
    const userResponse = {
      userName: findUserInfo.username,
      userId: findUserInfo.userId,
      userEmail: findUserInfo.useremail,
      userPw: findUserInfo.userPassWord,
    };
    return res.status(200).json(userResponse);
  } catch (error) {
    console.error(error, "/api/usersInfo 라우터 에러입니다.");
    return res
      .status(500)
      .json({ message: "내정보 보여주는 라우터 에러가 발생했습니다." });
  }
});

export default router;
