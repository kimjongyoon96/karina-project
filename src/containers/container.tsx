import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../JustAnd/GlobalState";

// //* zustand로 선언된 전역상태를 활용 클라이언트에게 경험향상
// const AuthManager = () => {
//   const navigate = useNavigate();

// //   useEffect(() => {
// //     //* jwt가 만료되었을때, 로그인한 사용자의 발급된 토큰의 유효시간이 지났을떄
// //     if (" === true) {
// //       // alert("다시 로그인하셔야합니다,");
// //       // navigate("/SignUp");
// //       console.log("토큰이 만료되었습니다.");
// //     }
// //   }, [jwtExpired]);

// //   return null;
// // };

// export default AuthManager;
