const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const { S3 } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mysql = require("mysql");
const { Pool } = require("pg");
const { exchangeCodeForAccessToken } = require("./oauth");
const getUserInfo = require("./userinfo");
const verifyUser = require("./jwt");
const cookieParser = require("cookie-parser");
// cors 에러 해결src/public/index.html

app.use(
  cors({
    origin: `${process.env.CLIENT_API_URL}`,
    credentials: true,
  })
);

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "akarina",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});
// postgreSQL 연결
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});
//* JWT - Header, Payload,Signature
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader.split(" ")[1], "이게무엇인고");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const newToken = token.split(".");
    console.log(newToken, "토큰입니다,");
    jwt.verify(newToken, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// 'api/test' 엔드포인트로 POST 요청을 처리
app.post("/api/addcomment", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    console.log("Received comment:", text);
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error while adding comment:", error);
    res.status(500).send("전송 실패");
  }
});
app.post(
  "/api/upload",
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "photoSumnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const UUid = req.body.id;
      const menubar = req.body.menubar;
      const title = req.body.title;
      const photoSumnail = req.files["photoSumnail"][0].location;
      const photos = req.files["photos"].map((photo) => photo.location);

      // console.log("Received ID:", UUid);
      // console.log("Received Menubar:", menubar);
      // console.log("Received Title:", title);
      // console.log(photoSumnail, "섬네일");
      // console.log(photos, "사진들");

      const insertQuery = `INSERT INTO karina(uuid, menubar, title, photosumnail, photos) VALUES ($1,$2,$3,$4,$5)`;

      await pool.query(insertQuery, [
        UUid,
        menubar,
        title,
        photoSumnail,
        photos,
      ]);

      res.status(200).json({
        message: "제출햇을때 주는 서버의 은총",
        data: { UUid, menubar, title, photoSumnail, photos },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "서버 에러 떳따!" });
    }
  }
);
//*
app.get("/api/karina", async (req, res) => {
  try {
    console.log(req.query, "쿼리입니다.");
    let baseQuery = "SELECT * FROM karina";
    let conditions = [];

    if (req.query.menubar) {
      conditions.push(`menubar = '${req.query.menubar}'`);
    }

    if (conditions.length > 0) {
      baseQuery += " WHERE " + conditions.join(" AND ");
    }
    if (req.query.page || req.query.limit) {
      let page = parseInt(req.query.page, 12) || 1;
      let limit = parseInt(req.query.limit, 12) || 10;
      let offset = (page - 1) * limit;
      baseQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    const { rows } = await pool.query(baseQuery);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// app.get("/api/comments", async (req, res) => {
//   res.json("안녕이다 이거야");
// });

// 사용자를 Google 로그인 페이지로 리디렉션하는 경로
app.get("/auth/google", (req, res) => {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: `${process.env.REACT_APP_API_URL}/auth/google/redirect`,
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    prompt: "consent",
  };

  const queryString = new URLSearchParams(params).toString();
  const authUrl = `${oauth2Endpoint}?${queryString}`;
  res.redirect(authUrl);
});

// Google로부터 리디렉션된 후 `authorization code`를 받아 처리하는 경로
app.get("/auth/google/redirect", async (req, res) => {
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
    const checkUserQuery = `SELECT * FROM userinfo WHERE useremail = $1`;
    const { rows } = await pool.query(checkUserQuery, [userEmail]);
    let user = rows.length > 0 ? rows[0] : null;

    if (!user) {
      // DB에 사용자가 없으면 새로 추가
      const insertQuery = `INSERT INTO userinfo(username, useremail) VALUES ($1, $2)`;
      await pool.query(insertQuery, [userName, userEmail]);
      // 새로 추가된 사용자 정보를 가져옴
      user = await verifyUser(pool, userEmail);
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userName: userName, userEmail: userEmail },
      secretKey,
      { expiresIn: "1h" }
    );
    console.log(token, "내가 발행한 유저의 토큰입니다.");

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.redirect(`${process.env.CLIENT_API_URL}`); // 클라이언트 페이지로 리디렉션
  } catch (error) {
    console.error("Error handling OAuth callback:", error);
    res.status(500).send("Authentication failed");
  }
});
app.get("/auth/cookie", (req, res) => {
  const token = req.cookies.token; // 쿠키에서 토큰 읽기
  if (token) {
    console.log(token, "/auth/cookie에 대한 응답");
    res.json({ token });
  } else {
    res.status(401).send("Unauthorized: No token provided");
  }
});
//* 모든 요청에 대한 HTML 반환
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`여기서 실행중: ${PORT}`);
});
