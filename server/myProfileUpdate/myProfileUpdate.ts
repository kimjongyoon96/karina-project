import express from "express";
import { userInfoData } from "../..//ORM/entity/userInfoEntity";
import ormConnection from "../..//ORM";
import eamilsend from ".././emailSend";
import { verifyToken } from "../jwt";
const router = express.Router();
const randomNumberFunction = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
router.post("/api/emailForAuth", verifyToken, async (req: any, res) => {
  const { inputEmail } = req.body;
  const { userName, naverLogin, loginType } = req.user;
  console.log(
    userName,
    naverLogin,
    loginType,
    "유저의이름과 로그인 수단입니다."
  );
  console.log(inputEmail, "비밀번호");
  const { dataSet } = req.user;

  const randomNumber = randomNumberFunction();
  try {
    const userRepository = ormConnection.getRepository(userInfoData);
    const findUser = userRepository.findOne({
      where: {
        useremail: inputEmail,
        username: userName,
        nonSocial: naverLogin,
      },
    });
    if (!findUser) {
      return res
        .status(404)
        .json({ message: "찾을 이메일이 존재하지 않습니다." });
    } else {
      const emailResult = await eamilsend({
        from: `${process.env.GOOGLE_ID}`,
        to: `${inputEmail}`,
        subject: "마이페이지 접근을 위한 비밀번호입니다.",
        text: `접근하시려면 ${randomNumber} 를 입력하세요`,
      });
      if (emailResult.success) {
        console.log("이메일 전송 성공!");
      } else {
        console.log("이메일 전송 실패!", emailResult.error);
      }
    }
    res.status(200).json(randomNumber);
  } catch (error) {
    res.status(500).json({ message: "오류" });
  }
});

export default router;
