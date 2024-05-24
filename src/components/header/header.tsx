// src/components/Header.tsx
import React, { useState } from "react";
import pageLogo from "../../assets/photo/pagelogo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../JustAnd/GlobalState";
import LoadingModalViewComponent from "../customComponent/loadingComponent/loadindComponent";
const Header: React.FC = () => {
  const Navigate = useNavigate();
  const { setAllertMessage } = useAuthStore((state) => state.alertState);
  const { jwtDecodingData, setJwtDecodingData } = useAuthStore(
    (state) => state.jwtGlobal
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const handlebing = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 1000); // 2초 후에 로딩을 멈추고 결과를 표시합니다.
  };
  return (
    <header className="header">
      {isLoading && <LoadingModalViewComponent />}
      <button className="mypage-btn" onClick={handlebing}>
        리턴값 확인하기
      </button>
      <button
        className="myPage-btn"
        onClick={() => {
          Navigate("myPage");
        }}
      >
        마이페이지
      </button>
      <img
        className="logo"
        onClick={() => {
          Navigate("/");
        }}
        src={pageLogo}
        alt="Page Logo"
      />
      {jwtDecodingData ? (
        <button
          className="loginButton"
          onClick={() => {
            console.log("login 버튼 누름");
            Navigate("SignUp");
          }}
        >
          로그인
        </button>
      ) : (
        <button
          className="logoutButton"
          onClick={() => {
            console.log("로그아웃 버튼 눌림");
            Navigate("SignUp");
          }}
        >
          로그아웃
        </button>
      )}
      <h1 className="title">장카설유</h1>
    </header>
  );
};

export default Header;
// src/assets/photo/pagelogo.png
