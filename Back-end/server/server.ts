import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env"
  ),
});

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import researchResultRouter from "./researchResultGet";
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
import viewTotalLikes from "./viewTotalLikes";
import userInfoDelete from "./userDelete";
import postView from "./postView";
import ormConnection from "../../ORM";
import { userpost } from "../../ORM/entity/userPostEntity";
const app = express();
//* cors 에러방지 미들웨어
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  })
);

const sessionMiddleware = session({
  secret: `${process.env.SESSION_KEY}||"deflat"`,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 360000 }, //* HTTPS를 사용하지 않는 경우 false로 설정
});
app.use(sessionMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(registerApi); // 회원가입 라우터
app.use(loginCheckApi); // 로그인 라우터
app.use(recoverUserId); // 로그인 찾기 로직
app.use("api/recoverUserPw", recoverUserPw); // 비밀번호 찾기 로직
app.use("api/certifyNumber", certifyNumber); // 인증번호 검증 로직
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
app.use(userInfoDataForMyPage);
app.use(myInfoUpdate); // Patch 요청 내정보 수정 라우터
app.use(jwtExpired); // jwtExpired 검증로직
app.use(addComment); // 디테일 페이지 글쓰기 라우터
app.use(addLike); // 좋아요 로직
app.use(viewComments); // 쓴 댓글 보기
app.use(viewLikes); // 좋아요 한 숫자 보기 로직
app.use(googleLogin); // 구글 로그인 처리
app.use(viewTotalLikes); //* 논 로그인 유저 좋아요 로직 보여주기
app.use(userInfoDelete); // 회원탈퇴 처리하는 라우터
app.use(postView); // 게시물 조회수 처리 라우터

//* 쿠키 http 통신에 의해서 삭제하는 로직
app.post("/auth/clearCookie", (req, res) => {
  res.clearCookie("token", { path: "/" });
  return res.status(200).json({ message: "쿠키가 잘 삭제되었습니다." });
});

// * 모든 요청에 대한 HTML 반환
app.use(
  process.env.NODE_ENV === "production"
    ? express.static(path.join(__dirname, "..", ".."))
    : express.static(path.join(__dirname, ".."))
); //* 기준은 컴파일 이후로 기준
app.get("/*", function (req, res) {
  res.sendFile(
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "..", "..", "index.html")
      : path.join(__dirname, "..", "..", "src", "public", "index.html")
  ); //* 기준은 컴파일 이후
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`여기서 실행중입니다: ${PORT}`);
});
