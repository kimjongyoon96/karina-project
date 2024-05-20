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
// import { setupWebSocket } from "./socet";
import { ormConnection } from "../ORM";
import { userPost } from "../ORM/entity/userPostEntity";
import { userLike } from "../ORM/entity/userLikeEntity";
import { userInfoData } from "../ORM/entity/userInfoEntity";
import { userComment } from "../ORM/entity/userCommentsEntity";

const app = express();
//* cors 에러방지 미들웨어
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
  })
);

const secretKey = process.env.JWT_SECRET_KEY;
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
app.use("api//recoverUserPw", recoverUserPw, sessionMiddleware); // 비밀번호 찾기 로직
app.use("api//certifyNumber", certifyNumber, sessionMiddleware); // 인증번호 검증 로직
app.use("/api/changePw", changePw, sessionMiddleware); // 비밀번호 변경 로직
app.use(researchOutput);
app.use(naverLogin);
app.use(myPage); //마이페이지 라우터
app.use(fileUpload); //* 파일 업로드 라우터
app.use(cookieParserRouter); //* 쿠키 읽기 라우터
app.use(uploadDatajksy); //* 업로드한 라우터
app.use(addNickName); //닉네임 추가로직 라우터
app.use(deleteMyPage); //* 마이페이지 게시글,댓글 삭제 라우터
app.use(collaboration); // 사주팔자 라우터
app.use(sajuResult); // 사주팔자 결과값
app.use(profileUpdate); //마이프로필 업데이트 라우터

//* 모듈화 후보 1 -> 댓글 추가 로직 => ORM 리팩토링
app.post("/api/addcomment", verifyToken, async (req: any, res) => {
  try {
    //클라이언트로 부터 text,postuuid 받음
    const { text, postuuid } = req.body;
    //* jwt에서 유저이름 추출
    const userInfo = req.user.userName;
    console.log(req.user, "댓글 입력시 userInfo 뭐가오나");
    //* 유저인포 엔티티에 접근
    const userInfoRepository = ormConnection.getRepository(userInfoData);
    //* jwt에서 추출한 user 이름과 동일한 엔티티가 존재하는지 찾음
    const userInfoDetail = await userInfoRepository.findOne({
      where: { username: userInfo },
    });
    if (!userInfoDetail) {
      return res.status(404).json({ message: "닉네임이 없습니다." });
    }
    console.log(userInfoDetail.userNickName, "닉네임");

    const UserComment = new userComment(); // 엔티티 클래스 선언
    UserComment.text = text;
    UserComment.postuuid = postuuid;
    UserComment.username = userInfo;
    UserComment.userNickName = userInfoDetail.userNickName;

    const userPostRepository = ormConnection.getRepository(userComment);
    await userPostRepository.save(UserComment);
    const userNickName = userInfoDetail?.["userNickName"];
    res.status(200).json({
      message: "댓글 작성이 완료되었습니다.",
      userNickName: userNickName, //* 닉네임을 클라이언트로 보낸다.
    });
  } catch (error) {
    console.error("댓글 작성 에러가 발생했습니다.:", error);
    if (!res.headersSent) {
      res.status(500).send("전송 실패");
    }
  }
});

//* 좋아요 로직
app.post("/api/like", verifyToken, async (req: any, res) => {
  try {
    const { postuuid } = req.body;
    const userinfo = req.user.userName;

    console.log(postuuid, "포스트유유아이디");
    console.log(userinfo, "받은 유저의이름");

    const findUserInfo = ormConnection.getRepository(userInfoData);
    const userInfoMatch = findUserInfo.findOne({
      where: { username: userinfo },
    });
    if (!userInfoMatch) {
      return res
        .status(404)
        .json({ message: "좋아요를 위한 사용자가 없습니다." });
    }

    const UserLike = new userLike();
    UserLike.postid = postuuid;
    UserLike.username = userinfo;

    const userPostRepository = ormConnection.getRepository(userLike);
    await userPostRepository.save(UserLike);
    res.status(200).json({ message: "추천이 정상적으로 되었습니다." });
  } catch (error) {
    console.error("에러가 발생, 좋아요 로직 이상 서버", error);
    if (!res.headersSent) {
      res.status(500).send("전송 실패");
    }
  }
});
//* 모듈화 후보 3 -> 댓글 보기 로직 => ORM 리팩토링
app.get("/api/viewComments/:postuuid", async (req: any, res) => {
  try {
    const { postuuid } = req.params;
    console.log(postuuid, "파라미터에서 추출한 UUID");
    console.log("여기는 댓글을 보여주는 서버쪽 인데..");

    const comments = await ormConnection.getRepository(userComment).find({
      where: { postuuid: postuuid },
      select: ["userNickName", "text"],
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("댓글 불러오는데 에러났다", error);
    res.status(500).json({ message: "댓글을 불러올수 없습니다." });
  }
});
//* 모듈화 후보 4 -> 좋아요 보기 로직 => ORM 리팩터링
app.get("/api/viewLikes/:postuuid", verifyToken, async (req: any, res) => {
  try {
    const { postuuid } = req.params;
    console.log(postuuid, "좋아요 갯구의 req.params 로직");
    const userid = req.user.userName;
    console.log(postuuid, userid, "여기는 무엇인가?");

    //* 전체 좋아요 수
    const totalLikesCount = await ormConnection
      .getRepository(userLike)
      .createQueryBuilder("like")
      .where("like.postid = :postid", { postid: postuuid })
      .getCount();

    // 현재 사용자가 좋아요를 눌렀는지 확인합니다.
    const userLikeCount = await ormConnection
      .getRepository(userLike)
      .createQueryBuilder("like")
      .where("like.postid = :postid AND like.username = :username", {
        postid: postuuid,
        username: userid,
      })
      .getCount();

    res.json({
      totalLikes: totalLikesCount,
      userLiked: userLikeCount, // 좋아요 수가 0보다 크면 현재 사용자가 좋아요를 누른 것으로 간주합니다.
    });
  } catch (error) {
    console.error(" 좋아요 서버 에러 확인 하라", error);
    return res.status(500).json({ message: "좋아요 에러입니다," });
  }
});

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
app.get("/auth/google", (req, res) => {
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

// Google로부터 리디렉션된 후 `authorization code`를 받아 처리하는 경로
app.get("/auth/google/redirect", async (req: any, res) => {
  const { code } = req.query;
  console.log(code, "여기가 코드입니다.");

  try {
    const { access_token, refresh_token } =
      await exchangeCodeForAccessToken(code);
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);

    const userInfo = await getUserInfo(access_token);
    console.log(userInfo, "유저인포 나와라!");

    const userName = userInfo.names[0].displayName;
    const userEmail = userInfo.emailAddresses[0].value;
    // 여기까지는 동일한 적용(회원유무 상관없이)0

    // 로그인 하는 인간이 DB에 있는지 확인 로직
    const useregist = await ormConnection.getRepository(userInfoData);

    let user = await useregist.findOne({ where: { useremail: userEmail } });

    if (!user) {
      // DB에 사용자가 없으면 새로 추가
      const User = new userInfoData();
      User.username = userName;
      User.useremail = userEmail;
      User.googleLogin = true;
      await useregist.save(User);

      // 새로 추가된 사용자 정보를 가져옴
      user = await useregist.findOne({ where: { useremail: userEmail } });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userName: userName, userEmail: userEmail },
      secretKey,
      { expiresIn: "5h" }
    );
    console.log(token, "내가 발행한 유저의 토큰입니다.");
    console.log(user?.userNickName, "유저닉네임이 있는가?");
    if (!user?.userNickName || user.userNickName === "defaultNickName") {
      res.cookie("token", token, { httpOnly: true, secure: false });
      return res.redirect(`${process.env.CLIENT_API_URL}/addNickName`); //닉네임 없으면 닉네임 추가 컴포넌트로 리다이렉트
    }
    //* 닉네임 있는 경우 바로 토큰 발급
    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.redirect(`${process.env.CLIENT_API_URL}`); // 클라이언트 페이지로 리디렉션
  } catch (error) {
    console.error("Error handling OAuth callback:", error);
    res.status(500).send("구글 로그인 문제가 있습니다");
  }
});
app.delete("/deleteMyTable", async (req: any, res) => {
  const { myName } = req.query;
  console.log(myName, "쿼리문이 뭐가오는지보자");
  try {
    const myData = ormConnection.getRepository(userInfoData);

    const userToDelete = await myData.find({ where: { username: myName } });
    console.log(userToDelete, "dd");
    if (userToDelete.length === 0) {
      return res.status(404).json({ message: "데이터가 없습니다." });
    }
    await myData.remove(userToDelete);
    return res.status(200).json({ messgae: "정상적으로 삭제되었습니다" });
  } catch (error) {
    return res.status(500).json({ message: "서버쪽 에러가 발생했습니다." });
  }
});

app.delete("/deleteTable", async (req: any, res) => {
  const { query } = req.query;
  console.log(query);
  try {
    const myCommnet = ormConnection.getRepository(userComment);
    const userDelete = await myCommnet.findOne({ where: { username: query } });
    if (userDelete) {
      await myCommnet.remove(userDelete);
      return res.status(200).json({ message: "잘햇따." });
    }
  } catch (error) {
    res.status(500).json({ message: "아무것도 삭제할것이 없습니다." });
  }
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
