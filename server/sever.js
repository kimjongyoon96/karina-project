const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config();
app.use(cors()); // 모든 요청에 대해 CORS를 활성화합니다.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "karinaphoto", // S3 버킷 이름
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
  upload.fields([{ name: "photoSumnail" }, { name: "photos" }]),
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
      console.log("Received Photo Sumnail:", photoSumnail);
      console.log("Received Photos:", photos);

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
