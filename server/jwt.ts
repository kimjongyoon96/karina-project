import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

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
