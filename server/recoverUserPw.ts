import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { hashPassWord, verifyPassword } from "../src/services/userPwHash";
import generateNumber from "../src/services/generateRandom";
import eamilsend from "./emailSend";

const router = express.Router();

router.post("/api/recoverPw", async (req: any, res) => {
  try {
    console.log(req.body, "클라이언트가 보낸 pw정보");
    //1. 인풋 값 받는다.
    const { inputUserEmail, inputUserId } = req.body;

    const userRepository = ormConnection.getRepository(nonSocialUserInfoData);
    const existUser = await userRepository.findOne({
      where: {
        userid: inputUserId,
      },
    });
    if (!existUser) {
      res.status(409).json({ message: "pw찾기위한 회원정보 없음" });
    }
    const random = await generateNumber();
    req.session.authcode = random;
    req.session.authUserId = inputUserId;
    const emailResult = await eamilsend({
      from: `${process.env.GOOGLE_ID}`,
      to: `${inputUserEmail}`,
      subject: "비밀번호 찾기위한 6가지 숫자입니다.",
      text: `인증번호는 ${random} 입니다.`,
    });
    if (emailResult.success) {
      console.log("Notification sent successfully");
      return res.json({ message: "모든 데이터가 성공적입니다.", sucess: true });
    } else {
      console.log("Failed to send notification");
      return res
        .status(500)
        .json({ message: "이메일 전송 실패", error: emailResult.error });
    }
  } catch (error) {
    console.error(error, "pw 찾기에 대한 에러입니다.");
    return res.status(500).json({ message: "pw 찾기에 대한 경고입니다." });
  }
});

export default router;
