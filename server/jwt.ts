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
          .status(401)
          .json({ message: "jwt 토큰이 만료되었습니다. 다시 로그인하세요" });
      }
      console.log(decoded, "디코딩 된 데이터입니다.");

      const { userid, userName, userEmail, loginType } = decoded; //* 소셜로그인은 userid가 undefinded, 논소셜은 userName이 undefinded

      if (loginType === "nonSocial" && !userid) {
        return res
          .status(500)
          .json({ messgae: "논소셜 로그인인데 userid가 존재하지 않습니다." });
      }
      if ((loginType === "NAVER" || loginType === "GOOGLE") && !userName) {
        return res.status(500).json({
          message:
            "네이버 로그인 혹은 구글 로그인 임에도 불구하고 userName이 없습니다.",
        });
      }
      if (!loginType && !userEmail) {
        return res
          .status(500)
          .json({ message: "검증하기 위한 이메일과 로그인타입이 없습니다." });
      }

      req.user = {
        userEmail,
        loginType,
        identifier: loginType === "nonSocial" ? userid : userName, //* 로그인 타입이 nonsocial이면 identifier가 true 즉 userid, false이면 identifier가 userName
      };
      next();
    });
  }
};

//* 라우터에서 토큰을 검증하는 로직
