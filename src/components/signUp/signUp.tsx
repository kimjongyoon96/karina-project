import React from "react";

const SignUp = () => {
  const handleGoogleLogin = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    // const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // // Parameters to pass to OAuth 2.0 endpoint.
    // const params = {
    //   client_id: process.env.REACT_APP_CLIENT_ID,
    //   redirect_uri: "http://localhost:3001",

    //   response_type: "code",
    //   scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    //   include_granted_scopes: "true",
    //   state: "pass-through value",
    // };

    // // Build the URL for the OAuth 2.0 endpoint.
    // const url = new URL(oauth2Endpoint);
    // console.log(url);
    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key])
    // );

    // // Redirect to the OAuth 2.0 endpoint.
    // window.location.href = url.href;
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="signup-container">
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        구글로 로그인하기
      </button>
    </div>
  );
};

export default SignUp;
