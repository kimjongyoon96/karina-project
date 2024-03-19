// import express, { Request } from "express";
// import multer from "multer";
// import cors from "cors";
// import path from "path";
// import dotenv from "dotenv";
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
// import cookieParser from "cookie-parser";

// const app = express();
// //* cors 에러방지 미들웨어
// app.use(
//   cors({
//     origin: `*`,
//     credentials: true,
//   })
// );
// const secretKey = process.env.JWT_SECRET_KEY;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.get("/api/test", (req: any, res: any) => {
//   console.log(req, "유저가 보낸 데이터입니다.");
//   res.json({ message: "잘받았다, 이제되었을것이다." });
// });

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`여기서 실행중입니다: ${PORT}`);
// });
