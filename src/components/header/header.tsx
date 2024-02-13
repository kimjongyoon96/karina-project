// src/components/Header.tsx
import React from "react";
import pageLogo from "../../assets/photo/pagelogo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const Navigate = useNavigate();
  return (
    <header className="header">
      <img
        className="logo"
        src={pageLogo}
        alt="Page Logo"
        onClick={() => {
          Navigate("/");
        }}
      />
      <button
        className="loginButton"
        onClick={() => {
          Navigate("SignUp");
        }}
      />

      <h1 className="title">카리나 갤러리</h1>
    </header>
  );
};

export default Header;
// src/assets/photo/pagelogo.png
