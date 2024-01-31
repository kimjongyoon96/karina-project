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

app.use(cors()); // 모든 요청에 대해 CORS를 활성화합니다.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    bucket: "akarina", // S3 버킷 이름
    acl: "public-read", // 파일 접근 권한 설정
    contentType: multerS3.AUTO_CONTENT_TYPE, // 파일 타입 자동 설정
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

// 'api/test' 엔드포인트로 POST 요청을 처리
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
      const photoSumnail = req.files["photoSumnail"][0].location; // 'photoSumnail' 파일 데이터
      const photos = req.files["photos"].map((photo) => photo.location); // 'photos' 필드로 여러 파일을 받음

      console.log("Received ID:", UUid);
      console.log("Received Menubar:", menubar);
      console.log("Received Title:", title);
      console.log(photoSumnail, "섬네일");
      console.log(photos, "사진들");

      const insertQuery = `INSERT INTO karina(uuid, menubar, title, photosumnail, photo) VALUES ($1,$2,$3,$4,$5)`;

      await pool.query(insertQuery, [
        UUid,
        menubar,
        title,
        photoSumnail,
        photos,
      ]);

      res.status(200).json({ message: "데이터 성공적으로 받음!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "서버 에러 떳따!" });
    }
  }
);
app.get("/api/karina", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM karina");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`여기서 실행중: ${PORT}`);
});
