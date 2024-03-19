import React from "react";
import "./signUp.css";
import { AuthContextType } from "../../types/contentType";

const SignUp = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.CLIENT_API_URL}/auth/google`;
  };

  return (
    <div className="signup-container">
      <div className="login-box">
        <h1 className="title">Karina Gallery</h1>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          구글로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
