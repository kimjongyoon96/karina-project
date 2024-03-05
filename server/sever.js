const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const { S3 } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { exchangeCodeForAccessToken } = require("./oauth");
const getUserInfo = require("./userinfo");
const verifyUser = require("./jwt");
const cookieParser = require("cookie-parser");
const pool = require("./db");
const researchResultRouter = require("./researchResultGet");

//* cors 에러방지 미들웨어
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
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
// });
//* JWT 토큰 미들웨어
//* JWT - Header, Payload,Signature
//* exp , iat , sub 통해 검증
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token, "여기가지는");
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err, "에러내용을 보자");
        return res.sendStatus(403);
      }
      console.log(decoded, "디코딩된데이터");

      const { userName, userEmail } = decoded;

      if (!userName || !userEmail) {
        return res.status(400).send("페이로드에 Id 혹은 email이 없음.");
      }
      req.user = decoded;
      // req.user = { id: decoded.id };
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};
app.use("/", researchResultRouter);
// 'api/test' 엔드포인트로 POST 요청을 처리
app.post("/api/addcomment", verifyToken, async (req, res) => {
  try {
    const { text, postuuid } = req.body;
    const userInfo = req.user.userName;

    console.log("Received comment:", text); // 받은 텍스트
    console.log("받은 uuid", postuuid); // 받은 게시물 Uuid
    console.log("검증된 아이디", userInfo); // 쓴놈의 이름

    const insertQuery = `INSERT INTO Comments(username, postuuid, text) VALUES ($1,$2,$3)`;

    await pool.query(insertQuery, [userInfo, postuuid, text]);
    res.status(200).json({
      message: "Comment added successfully",
      userInfo: userInfo, // 여기서 userInfo는 전송하고자 하는 사용자 정보 객체입니다.
    });
  } catch (error) {
    console.error("Error while adding comment:", error);
    if (!res.headersSent) {
      res.status(500).send("전송 실패");
    }
  }
});
app.post("/api/like", verifyToken, async (req, res) => {
  try {
    const { postuuid } = req.body;
    const userinfo = req.user.userName;

    console.log(postuuid, "포스트유유아이디");
    console.log(userinfo, "받은 유저의이름");

    const insertQuery = `INSERT INTO Likes(UserName, postID) VALUES ($1,$2)`;
    await pool.query(insertQuery, [userinfo, postuuid]);
    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.error("에러가 발생, 좋아요 로직 이상 서버", error);
    if (!res.headersSent) {
      res.status(500).send("전송 실패");
    }
  }
});
app.get("/api/viewcomments/:postuuid", async (req, res) => {
  try {
    const { postuuid } = req.params;
    console.log(postuuid, "파라미터에서 추출한 UUID");
    const queryText = "SELECT username , text FROM Comments WHERE postuuid =$1";
    const comments = await pool.query(queryText, [postuuid]);
    res.json(comments.rows);
  } catch (error) {
    console.error("댓글 불러오는데 에러났다", error);
  }
});
//* 좋아요 숫자 마운트 로직
app.get("/api/viewLikes/:postuuid", verifyToken, async (req, res) => {
  try {
    const { postuuid } = req.params;
    const userid = req.user.userName;
    console.log(postuuid, userid);
    /** $1은 [postuuid]로 대체된다. */
    const likeQuery = "SELECT COUNT(*) FROM Likes WHERE postid = $1";
    const likesResult = await pool.query(likeQuery, [postuuid]);
    // res.json(likesResult.rows[0]); // {count :4 }
    const totalLikes = likesResult.rows[0];

    const userLikeQuery =
      "SELECT COUNT(*) FROM Likes WHERE postid = $1 AND username = $2";
    const userLikeResult = await pool.query(userLikeQuery, [postuuid, userid]);
    // res.json(userLikeResult.rows[0]); // {count :4}
    const userLiked = userLikeResult.rows[0];
    res.json({ totalLikes: totalLikes, userLiked: userLiked });
  } catch (error) {
    console.error(" 댓글 서버 에러 확인 하라", error);
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
      { expiresIn: "2h" }
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
