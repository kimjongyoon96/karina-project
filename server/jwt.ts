import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  console.log(" 클라이언트의 headers", req.headers);
  const token = req.headers["authorization"];
  console.log("verifyToken에서 token의 값:", token);
  if (!token) {
    console.log("토큰검증 함수에서 토큰이 없습니다.");
    return res
      .status(404)
      .json({ message: "검증할 토큰이 존재하지 않습니다." });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err, "JWT 토큰을 검증하는데 오류가 있습니다.");
        return res
          .status(403)
          .json({ message: "JWT 토큰 검증도중 에러가 발생했습니다." });
      }
      console.log(decoded, "디코딩 된 데이터입니다.");

      const { userName, userEmail, loginType } = decoded;

      if (!userName || !userEmail || !loginType) {
        return res
          .status(500)
          .json({ message: "jwt 해석한 값중 어떤 값이 존재하지 않습니다." });
      }
      req.user = decoded;
      next();
    });
  }
};

//* 라우터에서 토큰을 검증하는 로직
