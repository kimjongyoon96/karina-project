import express from "express";
import { verifyToken } from "./jwt";

const router = express.Router();

router.post("/auth/jwtTokenExpired", verifyToken, async (req: any, res) => {
  const userinfo = req.user;
  console.log("토큰 미들웨어 해석 유저정보:", userinfo);
  try {
    if (!userinfo) {
      return res.status(404).json({ message: "jwt 토큰이 존재하지 않습니다." });
    }
    return res
      .status(200)
      .json({ message: "토큰이 잘 있습니다.", userinfo: userinfo });
  } catch (error) {
    return res.status(500).json({ message: "토큰 만료 라우터 에러" });
  }
});

export default router;
