const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const { S3 } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mysql = require("mysql");

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

// 'api/test' 엔드포인트로 POST 요청을 처리
app.post(
  "/api/upload",
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "photoSumnail", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const id = req.body.id;
      const menubar = req.body.menubar;
      const title = req.body.title;
      const photoSumnail = req.files["photoSumnail"]; // 'photoSumnail' 파일 데이터
      const photos = req.files["photos"]; // 'photos' 필드로 여러 파일을 받음

      console.log("Received ID:", id);
      console.log("Received Menubar:", menubar);
      console.log("Received Title:", title);
      photoSumnail.forEach((photoSumnail) => {
        console.log("photosum URL:", photoSumnail.location);
      });
      photos.forEach((photo, index) => {
        console.log("Photo Index:", index, "Photo URL:", photo.location);
      });

      res.status(200).json({ message: "Data received successfully!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
