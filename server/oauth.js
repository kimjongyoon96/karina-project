// // oauth.js

// const axios = require("axios");

// async function exchangeCodeForAccessToken(code) {
//   const tokenUrl = "https://oauth2.googleapis.com/token";
//   const params = {
//     client_id: process.env.REACT_APP_CLIENT_ID,
//     client_secret: process.env.REACT_APP_CLIENT_SECRET,
//     code: code,
//     redirect_uri: "http://localhost:3001", // Must match the one used in the frontend
//     grant_type: "authorization_code",
//   };
//   console.log(params.code, "파라미터 코드값입니다.");
//   try {
//     const response = await axios.post(tokenUrl, null, {
//       params: params,
//     });

//     const accessToken = response.data.access_token;
//     const refreshToken = response.data.refresh_token;

//     // Now you can use the accessToken to make authorized requests to Google APIs

//     // You can also store the tokens in your database for future use
//     // Be sure to handle token storage securely in a production environment

//     return accessToken;
//   } catch (error) {
//     console.error(
//       "Error exchanging authorization code for access token:",
//       error
//     );
//     throw new Error("Error exchanging authorization code for access token");
//   }
// }

// module.exports = {
//   exchangeCodeForAccessToken,
// };

// oauth.js
const axios = require("axios");

async function exchangeCodeForAccessToken(code) {
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const data = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    redirect_uri: "http:///13.125.249.85:4000/auth/google/redirect",
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

module.exports = { exchangeCodeForAccessToken };
