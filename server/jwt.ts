import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("여기 auth있냐?", req, "여기까지야");
  if (authHeader) {
    console.log(authHeader, "여기는 뭐가 나올까?");
    const token = authHeader.split(" ")[1];
    console.log(token, "여기가지는");
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err, "에러내용을 보자");
        return res.status(403).json(err, { message: "JWT가 만료되었습니다." });
      }
      console.log(decoded, "디코딩된데이터");

      const { userName, userEmail } = decoded;

      if (!userName || !userEmail) {
        return res.status(400).send("페이로드에 Id 혹은 email이 없음.");
      }
      req.user = decoded;
      // req.user = { id: decoded.id };
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};
