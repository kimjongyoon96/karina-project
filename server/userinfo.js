const axios = require("axios"); // 상단에 axios 모듈을 포함시켜주세요.

// 사용자 정보를 가져오는 함수를 별도로 정의
async function getUserInfo(accessToken) {
  const url =
    "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 매개변수 이름을 일관되게 사용
      },
    });
    return response.data; // 사용자의 이름과 이메일 주소가 여기에 포함될 것입니다.
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
}

module.exports = getUserInfo;
