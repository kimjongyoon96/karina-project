import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import axios from "axios";
import express, { Request, Response } from "express";
import qs from "querystring";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import ormConnection from "../ORM";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const router = express.Router();

// 사용자를 Google 로그인 페이지로 리디렉션하는 경로
const client_id = process.env.CLIENT_ID;
const redirect_uri = `${process.env.REACT_APP_API_URL}/auth/google/redirect`;
const response_type = "code";
const scope =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
const access_type = "offline";
const prompt = "consent";
if (
  !client_id ||
  !redirect_uri ||
  !response_type ||
  !scope ||
  !access_type ||
  !prompt
) {
  throw new Error("google 로그인 parmas 에서 뭔가 잘못되었어.");
}

router.get("/auth/google", (req, res) => {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = {
    client_id,
    redirect_uri,
    response_type,
    scope,
    access_type,
    prompt,
  };
  const queryString = new URLSearchParams(params).toString();
  const authUrl = `${oauth2Endpoint}?${queryString}`;
  res.redirect(authUrl);
});

export default router;
