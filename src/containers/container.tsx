import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../JustAnd/GlobalState";

//* zustand로 선언된 전역상태를 활용 클라이언트에게 경험향상
const AuthManager = () => {
  const { jwtExpired } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtExpired === true) {
      alert("다시 로그인하셔야합니다,");
      navigate("/SignUp");
    }
  }, [jwtExpired]);

  return null;
};

export default AuthManager;
