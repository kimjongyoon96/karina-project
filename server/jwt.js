const jwt = require("jsonwebtoken");

async function verifyUser(pool, email) {
  try {
    // 사용자 이메일로 데이터베이스 조회
    const result = await pool.query(
      "SELECT * FROM userInfo WHERE userEmail = $1",
      [email]
    );

    // 사용자 정보가 데이터베이스에 존재하는지 확인
    if (result.rows.length > 0) {
      return result.rows[0];
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
