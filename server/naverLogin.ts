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
const secretKey = process.env.JWT_SECRET_KEY;

//* 네이버 로그인 이후 콜백 엔드포인트
router.get("/callback", async (req, res) => {
  const code = await req.query.code;
  const state = req.query.state;
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  const redirectURI = process.env.NAVER_CALLBACK_URL;
  const data = new URLSearchParams({
    grant_type: "authorization_code" as string,
    client_id: clientId as string,
    client_secret: clientSecret as string,
    redirect_uri: redirectURI as string,
    code: code as string,
    state: state as string,
  });

  const tokenUrl = "https://nid.naver.com/oauth2.0/token";

  try {
    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const accessToken = response.data.access_token;
    // console.log(accessToken, "여기 뭐가 나오나 보자");
    // 인증 후 클라이언트로 리디렉션

    const userInfoURI = "https://openapi.naver.com/v1/nid/me";
    const userInfoResponse = await axios.get(userInfoURI, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //* 네이버 사용자 정보
    const userInfo = userInfoResponse.data;
    //* userInfo.response.email || userInfo.response.nickname || userInfo.response.name
    const { email, nickname, name } = userInfo.response;
    const loginType = "NAVER";
    //* 소셜로그인 엔티티 불러오기
    const naverUserExist = await ormConnection.getRepository(userInfoData);
    //* 소셜로그인 엔티티에 정보 찾기(이메일과 이름으로)
    let user = await naverUserExist.findOne({
      where: { useremail: email },
    });
    if (!user) {
      //* DB에 회원이 없는경우 DB에 회원 저장
      const newUser = new userInfoData();
      newUser.username = name;
      newUser.useremail = email;
      newUser.userNickName = nickname;
      newUser.loginType = loginType;
      await naverUserExist.save(newUser);

      //* 새로 추가된 사용자 정보를 가져옴(네이버)
      user = await naverUserExist.findOne({ where: { useremail: email } });
    }
    //* JWT 토큰 정의
    const tokenForJwt = jwt.sign(
      {
        userName: name,
        userid: undefined,
        userEmail: email,
        loginType: loginType,
      },
      secretKey,
      { expiresIn: "5h" }
    );
    console.log(tokenForJwt, "네이버 로그인시 발행되는 JWT 토큰입니다.");
    res.cookie("token", tokenForJwt, { httpOnly: true, secure: false });

    return res.redirect(`${process.env.CLIENT_API_URL}`);
  } catch (error) {
    console.error(
      "네이버 인증 오류:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("인증 오류");
  }
});

export default router;
