import path from "path";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
}

export async function exchangeCodeForAccessToken(
  code: string
): Promise<AccessTokenResponse> {
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const data = new URLSearchParams({
    client_id: process.env.CLIENT_ID || "",
    client_secret: process.env.CLIENT_SECRET || "",
    code,
    redirect_uri: `${process.env.REACT_APP_API_URL}/auth/google/redirect`,
    grant_type: "authorization_code",
  }).toString();

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const { access_token, refresh_token } = response.data;
    return { access_token, refresh_token };
  } catch (error) {
    console.error(
      "Error exchanging authorization code for access token:",
      error
    );
    throw error;
  }
}

export default exchangeCodeForAccessToken;
