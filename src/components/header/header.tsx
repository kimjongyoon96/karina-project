// src/components/Header.tsx
import React from 'react';
import pageLogo from '../../assets/photo/pagelogo.png';
import './header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img className="logo" src={pageLogo} alt="Page Logo" />

      <h1 className="title">카리나 갤러리</h1>
    </header>
  );
};

export default Header;
// src/assets/photo/pagelogo.png
