import React from "react";
import { AuthContextType } from "../../types/contentType";

const SignUp = () => {
  const handleGoogleLogin = () => {
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
