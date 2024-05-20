import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.json({ message: "토큰이 존재하지 않습니다." });
  }
  const authHeader = req.headers.authorization;
  //   console.log("여기 auth있냐?", req, "여기까지야");
  if (authHeader) {
    console.log(authHeader, "토큰 검증 함수의 authHeader의 값");
    const token = authHeader.split(" ")[1];
    console.log(token, "여기가지는");
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err, "에러내용을 보자");
        return res.status(403).json(err, { message: "JWT가 만료되었습니다." });
      }
      console.log(decoded, "디코딩된데이터");

      const { userName, userEmail, naverLogin, googoleLogin, nonSocial } =
        decoded;

      if (!userName || !userEmail) {
        return res.status(400).send("페이로드에 Id 혹은 email이 없음.");
      }

      req.user = decoded;
      next();
    });
  } else {
    return res
      .sendStatus(401)
      .json({ message: "JWT 로직 전반에 이상이있습니다." });
  }
};
