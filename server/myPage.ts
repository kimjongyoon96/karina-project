import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { ormConnection } from "../ORM";
import { getRepository } from "typeorm";
import { nonSocialUserInfoData } from "../ORM/entity/nonSocialUserInfoEntity";
import { hashPassWord, verifyPassword } from "../src/services/userPwHash";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/test", (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: "" });
  }
});

export default router;
