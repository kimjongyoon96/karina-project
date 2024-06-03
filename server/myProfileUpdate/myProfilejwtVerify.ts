import express from "express";
import { verifyToken } from "../jwt";

const router = express.Router();

router.get("/api/usersData", verifyToken, async (req: any, res) => {
  const { identifier, userEmail, loginType } = req.user;
  console.log(
    identifier,
    userEmail,
    loginType,
    "유저정보를 반환하는 req의값입니다."
  );

  const userInfo = {
    identifier,
    userEmail,
    loginType,
  };

  try {
    if (identifier && userEmail && loginType) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "jwt를 해독할수 없습니다.." });
    }
  } catch (error) {
    res.status(500).json({ message: "jwt 정보를 반환할수 없습니다." });
  }
});

export default router;
