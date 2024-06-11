import express from "express";
import { verifyToken } from "./jwt";
import ormConnection from "../ORM/index";
import { userinfodata } from "../ORM/entity/userInfoEntity";
import { getRepository } from "typeorm";
const router = express.Router();

router.delete("/api/deleteUserInfo", verifyToken, async (req: any, res) => {
  const { identifier, loginType, userEmail } = req.user;
  console.log(identifier, loginType, userEmail);
  try {
    const usergist = ormConnection.getRepository(userinfodata);
    const user = await usergist.findOne({
      where:
        loginType === "nonSocial"
          ? { userId: identifier, useremail: userEmail }
          : { username: identifier, useremail: userEmail },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "회원탈퇴를 위한 회원정보가 존재하지 않습니다." });
    }
    await usergist.remove(user);
    return res.status(200).json({ message: "성공적으로 회원 탈퇴되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "회원탈퇴 api 작동 불가능" });
  }
});

export default router;
