import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

//* 토큰 검증을 클라이언트 쿠키 파서 안에 넣게, 헤더를 없애버리고 쿠키로 통일시킨다.

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies["token"];
//   if (!token) {
//     return res.json({ message: "토큰이 존재하지 않습니다." });
//   }
// const authHeader =
// if (authHeader) {
//   console.log(authHeader, "토큰 검증 함수의 authHeader의 값");
//   const token = authHeader.split(" ")[1];
//   console.log(token, "여기가지는");
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       console.log(err, "에러내용을 보자");
//       return res.status(403).json(err, { message: "JWT가 만료되었습니다." });
//     }
// console.log(decoded, "디코딩된데이터");

// const { userName, userEmail, loginType } = decoded;

//       if (!userName || !userEmail || !loginType) {
//         return res
//           .status(400)
//           .send("페이로드에 Id 혹은 email 혹은 로그인타입이 없음.");
//       }

//       req.user = decoded;
//       next();
//     });
//   } else {
//     return res
//       .sendStatus(401)
//       .json({ message: "JWT 로직 전반에 이상이있습니다." });
//   }
// };
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.["token"];
  console.log(token, "토큰검증함수에서 토큰의 값");
  if (!token) {
    console.log("토큰이없습니다.");
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err, "JWT 토큰을 검증하는데 오류가 있습니다.");
        return res.status(403).json({ err, message: "JWT가 만료되었습니다." });
      }
      console.log(decoded, "디코딩 된 데이터입니다.");
      const { userName, userEmail, loginType } = decoded;

      if (!userName || !userEmail || !loginType) {
        return res
          .status(404)
          .json({ message: "jwt 해석한 값중 어떤 값이 존재하지 않습니다." });
      }
      req.user = decoded;
      next();
    });
  }
};
