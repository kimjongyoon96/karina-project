const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS 미들웨어 가져오기
const app = express();
const PORT = 3000;
// 다른 host 에서 요청이 왔을때 생기는 문제 해결
// UI 서버=> 리액트의 웹팩 라이브 서버를 의미
const corsOptions = {
  origin: "http://localhost:3001", // 허용할 출처 지정
  optionsSuccessStatus: 200, // 일부 레거시 브라우저의 경우 실패 상태 대신에 200을 반환
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// "/cute" 경로로 들어오는 POST 요청 처리
app.post("/api/test", (req, res) => {
  console.log("Request received:", req.body);
  res.status(200).json({ message: "Hello World" });
});

// 3000번 포트에서 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
