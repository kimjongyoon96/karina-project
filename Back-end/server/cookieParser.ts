import express from "express";

const router = express();

router.get("/auth/cookie", async (req: any, res) => {
  const token = req.cookies.token; //* 쿠키에서 토큰 읽기
  console.log(token);
  try {
    if (!token) {
      console.log("token이 존재하지 않습니다.");
      return res.status(404).json({
        message: "404,전역으로 선언할 토큰을 가져오는데 실패했습니다.",
      });
    }
    return res.status(200).json({ token });
  } catch (error) {
    console.error(
      error,
      "auth/cookie 라우터에 에러가 발생했습니다, 확인하세요"
    );
    return res
      .status(500)
      .json({ message: "auth/cookie 라우터 에러 발생했습니다." });
  }
});

export default router;
