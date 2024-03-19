// import express, { Request } from "express";
// import multer from "multer";
// import cors from "cors";
// import path from "path";
// import { S3 } from "@aws-sdk/client-s3";
// import multerS3 from "multer-s3";
// import dotenv from "dotenv";
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
// import jwt from "jsonwebtoken";
// import exchangeCodeForAccessToken from "./oauth";
// import getUserInfo from "./userinfo";
// import cookieParser from "cookie-parser";
// // import researchResultRouter from "./researchResultGet";
// import { requestValueList } from "aws-sdk/clients/customerprofiles";
// import { ormConnection } from "../ORM";
// import { userPost } from "../ORM/entity/userPostEntity";
// import { userLike } from "../ORM/entity/userLikeEntity";
// import { userInfoData } from "../ORM/entity/userInfoEntity";
// import { userComment } from "../ORM/entity/userCommentsEntity";

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

// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const region = process.env.AWS_REGION;
// if (!accessKeyId || !secretAccessKey || !region) {
//   throw new Error("키값이 존재하지 않습니다.");
// }
// const s3 = new S3({
//   credentials: {
//     accessKeyId,
//     secretAccessKey,
//   },
//   region,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "akarina",
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
//     },
//   }),
// });
// //* 토크 검증 함수
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     console.log(token, "여기가지는");
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         console.log(err, "에러내용을 보자");
//         return res.sendStatus(403);
//       }
//       console.log(decoded, "디코딩된데이터");

//       const { userName, userEmail } = decoded;

//       if (!userName || !userEmail) {
//         return res.status(400).send("페이로드에 Id 혹은 email이 없음.");
//       }
//       req.user = decoded;
//       // req.user = { id: decoded.id };
//       next();
//     });
//   } else {
//     return res.sendStatus(401);
//   }
// };

// // app.use("/", researchResultRouter);
// //* test get 요청 받기

// app.get("/test", async (req: any, res: any) => {
//   try {
//     console.log(req, "test에서 보낸 메시지입니다.");
//     res.json({ message: "성공적으로 서버에서 응답 받음" });
//   } catch (error) {
//     console.log("야 서버에는 왔는데, 에러가떳어.", error);
//   }
// });
// //* 모듈화 후보 1 -> 댓글 추가 로직 => ORM 리팩토링
// app.post("/api/addcomment", verifyToken, async (req: any, res) => {
//   try {
//     const { text, postuuid } = req.body;
//     const userInfo = req.user.userName;
//     const UserComment = new userComment(); // 엔티티 클래스 선언
//     UserComment.text = text;
//     UserComment.postuuid = postuuid;
//     UserComment.username = userInfo;
//     console.log("Received comment:", text); // 받은 텍스트
//     console.log("받은 uuid", postuuid); // 받은 게시물 Uuid
//     console.log("검증된 아이디", userInfo); // 쓴놈의 이름
//     const userPostRepository = ormConnection.getRepository(userComment);
//     await userPostRepository.save(UserComment);
//     res.status(200).json({
//       message: "Comment added successfully",
//       userInfo: userInfo, // 여기서 userInfo는 전송하고자 하는 사용자 정보 객체입니다.
//     });
//   } catch (error) {
//     console.error("Error while adding comment:", error);
//     if (!res.headersSent) {
//       res.status(500).send("전송 실패");
//     }
//   }
// });

// //* 모듈화 후보 2 -> 좋아요 로직 => ORM 리팩토링
// app.post("/api/like", verifyToken, async (req: any, res) => {
//   try {
//     const { postuuid } = req.body;
//     const userinfo = req.user.userName;

//     console.log(postuuid, "포스트유유아이디");
//     console.log(userinfo, "받은 유저의이름");
//     const UserLike = new userLike();
//     UserLike.postid = postuuid;
//     UserLike.username = userinfo;

//     const userPostRepository = ormConnection.getRepository(userLike);
//     await userPostRepository.save(UserLike);
//     res.status(200).json({ message: "Like added successfully" });
//   } catch (error) {
//     console.error("에러가 발생, 좋아요 로직 이상 서버", error);
//     if (!res.headersSent) {
//       res.status(500).send("전송 실패");
//     }
//   }
// });
// //* 모듈화 후보 3 -> 댓글 보기 로직 => ORM 리팩토링
// app.get("/api/viewcomments/:postuuid", async (req, res) => {
//   try {
//     const { postuuid } = req.params;
//     console.log(postuuid, "파라미터에서 추출한 UUID");
//     // const queryText = "SELECT username , text FROM Comments WHERE postuuid =$1";
//     // const comments = await pool.query(queryText, [postuuid]);

//     const comments = await ormConnection.getRepository(userComment).find({
//       where: { postuuid: postuuid },
//       select: ["username", "text"],
//     });
//     res.json(comments);
//   } catch (error) {
//     console.error("댓글 불러오는데 에러났다", error);
//   }
// });
// //* 모듈화 후보 4 -> 좋아요 보기 로직 => ORM 리팩터링
// app.get("/api/viewLikes/:postuuid", verifyToken, async (req: any, res) => {
//   try {
//     const { postuuid } = req.params;
//     const userid = req.user.userName;
//     console.log(postuuid, userid);
//     // /** $1은 [postuuid]로 대체된다. */
//     // const likeQuery = "SELECT COUNT(*) FROM Likes WHERE postid = $1";
//     // const likesResult = await pool.query(likeQuery, [postuuid]);
//     // // res.json(likesResult.rows[0]); // {count :4 }
//     // const totalLikes = likesResult.rows[0];

//     // const userLikeQuery =
//     //   "SELECT COUNT(*) FROM Likes WHERE postid = $1 AND username = $2";
//     // const userLikeResult = await pool.query(userLikeQuery, [postuuid, userid]);
//     // // res.json(userLikeResult.rows[0]); // {count :4}
//     // const userLiked = userLikeResult.rows[0];
//     //* 전체 좋아요 수
//     const totalLikesCount = await ormConnection
//       .getRepository(userLike)
//       .createQueryBuilder("like")
//       .where("like.postid = :postid", { postid: postuuid })
//       .getCount();

//     // 현재 사용자가 좋아요를 눌렀는지 확인합니다.
//     const userLikeCount = await ormConnection
//       .getRepository(userLike)
//       .createQueryBuilder("like")
//       .where("like.postid = :postid AND like.username = :username", {
//         postid: postuuid,
//         username: userid,
//       })
//       .getCount();

//     res.json({
//       totalLikes: totalLikesCount,
//       userLiked: userLikeCount, // 좋아요 수가 0보다 크면 현재 사용자가 좋아요를 누른 것으로 간주합니다.
//     });
//   } catch (error) {
//     console.error(" 댓글 서버 에러 확인 하라", error);
//   }
// });

// //* 모듈화 후보 5 -> 게시물 업로드 로직 => ORM 리팩토링
// app.post(
//   "/api/upload",
//   upload.fields([
//     { name: "photos", maxCount: 10 },
//     { name: "photoSumnail", maxCount: 1 },
//   ]),
//   async (req: any, res) => {
//     try {
//       const UserPost = new userPost();
//       UserPost.uuid = req.body.id;
//       UserPost.menubar = req.body.menubar;
//       UserPost.title = req.body.title;
//       UserPost.photosumnail = req.files["photoSumnail"][0].location;
//       UserPost.photos = req.files["photos"].map((photo) => photo.location);
//       console.log("여기는 유저 업로드");

//       // const UUid = req.body.id;
//       // const menubar = req.body.menubar;
//       // const title = req.body.title;
//       // const photoSumnail = req.files["photoSumnail"][0].location;
//       // const photos = req.files["photos"].map((photo) => photo.location);
//       // const setThint = [UUid, menubar, title, photoSumnail, photos];
//       const userPostRepository = ormConnection.getRepository(userPost);
//       await userPostRepository.save(UserPost);
//       // const insertQuery = `INSERT INTO karina(uuid, menubar, title, photosumnail, photos) VALUES ($1,$2,$3,$4,$5)`;

//       // await pool.query(insertQuery, [
//       //   UUid,
//       //   menubar,
//       //   title,
//       //   photoSumnail,
//       //   photos,
//       // ]);

//       res.status(200).json({
//         message: "제출햇을때 주는 서버의 은총",
//         data: { UserPost },
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ message: "서버 에러 떳따!" });
//     }
//   }
// );

// //* 모듈화 후보 6 -> 게시물 렌더링 로직
// // app.get("/api/karina", async (req: any, res) => {
// //   try {
// //     console.log(req.query, "쿼리입니다.");
// //     let baseQuery = "SELECT * FROM karina";
// //     let conditions: string[] = [];

// //     if (req.query.menubar) {
// //       conditions.push(`menubar = '${req.query.menubar}'`);
// //     }

// //     if (conditions.length > 0) {
// //       baseQuery += " WHERE " + conditions.join(" AND ");
// //     }
// //     if (req.query.page || req.query.limit) {
// //       let page = parseInt(req.query.page, 12) || 1;
// //       let limit = parseInt(req.query.limit, 12) || 10;
// //       let offset = (page - 1) * limit;
// //       baseQuery += ` LIMIT ${limit} OFFSET ${offset}`;
// //     }

// //     const { rows } = await pool.query(baseQuery);
// //     res.json(rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Server error");
// //   }
// // });
// //* 모듈화 후보 6 => 리팩토링 ORM
// app.get("/api/karina", async (req: any, res) => {
//   try {
//     // 요청에서 쿼리스트링 파라미터를 추출
//     const { menubar, page, limit } = req.query;

//     // TypeORM에서 사용할 쿼리 조건 객체
//     const whereConditions = {};
//     if (menubar) {
//       whereConditions["menubar"] = menubar;
//     }

//     // 페이징 처리를 위한 옵션
//     const take = limit ? parseInt(limit, 10) : 10;
//     const skip = page ? (parseInt(page, 10) - 1) * take : 0;

//     // TypeORM을 사용하여 데이터 조회
//     const userPostRepository = ormConnection.getRepository(userPost);
//     const posts = await userPostRepository.find({
//       where: whereConditions,
//       take,
//       skip,
//     });

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// // 사용자를 Google 로그인 페이지로 리디렉션하는 경로
// const client_id = process.env.CLIENT_ID;
// const redirect_uri = `${process.env.REACT_APP_API_URL}/auth/google/redirect`;
// const response_type = "code";
// const scope =
//   "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
// const access_type = "offline";
// const prompt = "consent";
// if (
//   !client_id ||
//   !redirect_uri ||
//   !response_type ||
//   !scope ||
//   !access_type ||
//   !prompt
// ) {
//   throw new Error("google 로그인 parmas 에서 뭔가 잘못되었어.");
// }
// app.get("/auth/google", (req, res) => {
//   const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
//   const params = {
//     client_id,
//     redirect_uri,
//     response_type,
//     scope,
//     access_type,
//     prompt,
//   };
//   const queryString = new URLSearchParams(params).toString();
//   const authUrl = `${oauth2Endpoint}?${queryString}`;
//   res.redirect(authUrl);
// });

// // Google로부터 리디렉션된 후 `authorization code`를 받아 처리하는 경로
// app.get("/auth/google/redirect", async (req: any, res) => {
//   const { code } = req.query;
//   console.log(code, "여기가 코드입니다.");

//   try {
//     const { access_token, refresh_token } =
//       await exchangeCodeForAccessToken(code);
//     console.log("Access Token:", access_token);
//     console.log("Refresh Token:", refresh_token);

//     const userInfo = await getUserInfo(access_token);
//     console.log(userInfo, "유저인포 나와라!");

//     const userName = userInfo.names[0].displayName;
//     const userEmail = userInfo.emailAddresses[0].value;
//     // 여기까지는 동일한 적용(회원유무 상관없이)0

//     // 로그인 하는 인간이 DB에 있는지 확인 로직
//     const useregist = await ormConnection.getRepository(userInfoData);
//     // const checkUserQuery = `SELECT * FROM userinfo WHERE useremail = $1`;

//     // const { rows } = await pool.query(checkUserQuery, [userEmail]);
//     // let user = rows.length > 0 ? rows[0] : null;
//     let user = await useregist.findOne({ where: { useremail: userEmail } });

//     if (!user) {
//       // DB에 사용자가 없으면 새로 추가
//       // const insertQuery = `INSERT INTO userinfo(username, useremail) VALUES ($1, $2)`;
//       // await pool.query(insertQuery, [userName, userEmail]);
//       // // 새로 추가된 사용자 정보를 가져옴
//       // user = await verifyUser(pool, userEmail);
//       const User = new userInfoData();
//       User.username = userName;
//       User.useremail = userEmail;
//       await useregist.save(User);

//       // 새로 추가된 사용자 정보를 가져옴
//       user = await useregist.findOne({ where: { useremail: userEmail } });
//     }

//     // JWT 토큰 생성
//     const token = jwt.sign(
//       { userName: userName, userEmail: userEmail },
//       secretKey,
//       { expiresIn: "2h" }
//     );
//     console.log(token, "내가 발행한 유저의 토큰입니다.");

//     res.cookie("token", token, { httpOnly: true, secure: false });
//     res.redirect(`${process.env.REACT_APP_API_UR}`); // 클라이언트 페이지로 리디렉션
//   } catch (error) {
//     console.error("Error handling OAuth callback:", error);
//     res.status(500).send("Authentication failed");
//   }
// });

// //* 모듈화 후보 7 => 쿠키 로직
// app.get("/auth/cookie", (req, res) => {
//   const token = req.cookies.token; // 쿠키에서 토큰 읽기
//   // const token = jwt.sign({ hi: "bye" }, secretKey, { expiresIn: "2h" });
//   if (token) {
//     console.log(token, "/auth/cookie에 대한 응답");
//     res.json({ token });
//   } else {
//     res.status(200).send(token);
//   }
// });

// //* 모든 요청에 대한 HTML 반환
// // app.use(express.static(path.join(__dirname, "..", "dist")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
// });
// // ormConnection
// //   .initialize()
// //   .then(() => {
// //     const PORT = 4000;
// //     app.listen(PORT, () => {
// //       console.log(`여기서 실행중: ${PORT}`);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error("서버연결 에러 || ORM 연결 에러", error);
// //   });

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`여기서 실행중입니다: ${PORT}`);
// });
