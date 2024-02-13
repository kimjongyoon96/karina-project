const jwt = require("jsonwebtoken");

async function verifyUser(pool, email) {
  try {
    // 사용자 이메일로 데이터베이스 조회
    const result = await pool.query(
      "SELECT * FROM userInfo WHERE userEmail = $1",
      [email]
    );
    // console.log("여기서부터 시작:", result.rows, "jwt.js의 user 이메일입니다.");

    // 사용자 정보가 데이터베이스에 존재하는지 확인
    if (result.rows.length > 0) {
      // 사용자 정보가 존재하면 사용자 객체 반환
      return result.rows[0]; // 첫 번째 결과 반환
    } else {
      // 사용자 정보가 존재하지 않으면 null 반환
      return null;
    }
  } catch (error) {
    console.error("Database query error", error);
    throw error;
  }
}

module.exports = verifyUser;
