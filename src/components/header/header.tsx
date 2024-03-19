// src/components/Header.tsx
import React from "react";
import pageLogo from "../../assets/photo/pagelogo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../types/contentType";
const Header: React.FC<AuthContextType> = ({ jwtToken, setJwtToken }) => {
  const Navigate = useNavigate();
  return (
    <header className="header">
      <img
        className="logo"
        onClick={() => {
          Navigate("/");
          console.log("메인페이지로이동");
        }}
        src={pageLogo}
        alt="Page Logo"
      />
      {!jwtToken && (
        <button
          className="loginButton"
          onClick={() => {
            console.log("login 버튼 누름");
            Navigate("SignUp");
          }}
        />
      )}

      <h1 className="title">정카설유</h1>
    </header>
  );
};

export default Header;
// src/assets/photo/pagelogo.png
