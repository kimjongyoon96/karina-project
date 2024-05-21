import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import jwt from "jsonwebtoken";
import { verifyToken } from "./jwt";
const secretKey = process.env.JWT_SECRET_KEY;

const router = express();

router.get("/auth/cookie", verifyToken, async (req: any, res) => {
  console.log(req.user, "verify 함수에서 쿠키에서 검증한 값입니다.");
  res.status(200).json(req.user);
});

export default router;
