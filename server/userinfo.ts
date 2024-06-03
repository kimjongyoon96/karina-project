import axios from "axios";

// 사용자 정보를 가져오는 함수를 별도로 정의
export async function getUserInfo(accessToken) {
  const url =
    "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
}

export default getUserInfo;
