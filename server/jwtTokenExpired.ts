import express from "express";
import { verifyToken } from "./jwt";

const router = express.Router();

router.post("/auth/jwtTokenExpired", verifyToken, async (req: any, res) => {
  const { userinfo } = req.user;
  try {
    if (!userinfo) {
      return res.status(404).json({ message: "jwt 토큰 없음" });
    }
    return res.status(200).json({ message: "받음" });
  } catch (error) {
    return res.status(500).json({ message: "토큰 만료 라우터 에러" });
  }
});

export default router;
