// src/components/Header.tsx
import React from "react";
import pageLogo from "../../assets/photo/pagelogo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../types/contentType";
import Alert from "../customComponent/signModalComponent/signModalComponent";
import useAuthStore from "../../JustAnd/GlobalState";
const Header: React.FC<AuthContextType> = ({ jwtToken, setJwtToken }) => {
  const Navigate = useNavigate();
  const { setAllertMessage } = useAuthStore((state) => state.alertState);
  console.log("전역변수로 선언된 JWT", jwtToken);
  return (
    <header className="header">
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
      {jwtToken ? (
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
