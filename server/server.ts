import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import session from "express-session";
import path from "path";
import { S3 } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import jwt from "jsonwebtoken";
import exchangeCodeForAccessToken from "./oauth";
import getUserInfo from "./userinfo";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import researchResultRouter from "./researchResultGet";
import { verifyToken } from "./jwt";
import registerApi from "./register";
import loginCheckApi from "./login";
import recoverUserId from "./recoverUserId";
import recoverUserPw from "./recoverUserPw";
import certifyNumber from "./certifyNumber";
import researchOutput from "./researchResultGet";
import changePw from "./newPw";
import naverLogin from "./naverLogin";
import myPage from "./myPage";
import fileUpload from "./fileUpload";
import cookieParserRouter from "./cookieParser";
import uploadDatajksy from "./uploadData";
import addNickName from "./addNickName";
import deleteMyPage from "./myPageDelete";
import collaboration from "./saju";
import sajuResult from "./sajuResult/sajuResult";
import profileUpdate from "./myProfileUpdate/myProfileUpdate";
import userProfileveify from "./myProfileUpdate/myProfilejwtVerify";
import userInfoDataForMyPage from "./myProfileUpdate/myInfoDataUpdate";
import myInfoUpdate from "./myProfileUpdate/myInfoUpdate";
import jwtExpired from "./jwtTokenExpired";
import addComment from "./addComments";
import addLike from "./addLike";
import viewComments from "./viewComments";
import viewLikes from "./viewLikes";
import googleLogin from "./googleLogin";

const app = express();
//* cors 에러방지 미들웨어
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const sessionMiddleware = session({
  secret: `${process.env.SESSION_KEY}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, //* HTTPS를 사용하지 않는 경우 false로 설정
});

app.use(registerApi); // 회원가입 라우터
app.use(loginCheckApi); // 로그인 라우터
app.use(recoverUserId); // 로그인 찾기 로직
app.use("api//recoverUserPw", recoverUserPw); // 비밀번호 찾기 로직
app.use("api//certifyNumber", certifyNumber); // 인증번호 검증 로직
app.use("/api/changePw", changePw); // 비밀번호 변경 로직
app.use(researchOutput); //* 검색결과 라우터
app.use(naverLogin); //* 네이버 로그인 라우터
app.use(myPage); //마이페이지 라우터
app.use(fileUpload); //* 파일 업로드 라우터
app.use(cookieParserRouter); //* 쿠키 읽기 라우터
app.use(uploadDatajksy); //* 업로드한 라우터
app.use(addNickName); //닉네임 추가로직 라우터
app.use(deleteMyPage); //* 마이페이지 게시글,댓글 삭제 라우터
app.use(collaboration); // 사주팔자 라우터
app.use(sajuResult); // 사주팔자 결과값
app.use(profileUpdate); //마이프로필 업데이트 라우터
app.use(userProfileveify); //* 마이페이지 진입시 jwt 토큰해독해서 유저정보 반환;
app.use(sessionMiddleware);
app.use(userInfoDataForMyPage);
app.use(myInfoUpdate); // Patch 요청 내정보 수정 라우터
app.use(jwtExpired); // jwtExpired 검증로직
app.use(addComment); // 디테일 페이지 글쓰기 라우터
app.use(addLike); // 좋아요 로직
app.use(viewComments); // 쓴 댓글 보기
app.use(viewLikes); // 좋아요 한 숫자 보기 로직
app.use(googleLogin);

//* 쿠키 http 통신에 의해서 삭제하는 로직
app.post("/auth/clearCookie", (req, res) => {
  res.clearCookie("token", { path: "/" });
  return res.status(200).json({ message: "쿠키가 잘 삭제되었습니다." });
});

//* 모든 요청에 대한 HTML 반환
// app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`여기서 실행중입니다: ${PORT}`);
});
