import React from 'react';
import './menubar.css';

// MenubarProps 타입 정의
interface MenubarProps {
  setCategory: (category: string) => void; // setCategory 함수의 타입 정의
}

const Menubar: React.FC<MenubarProps> = ({ setCategory }) => {
  return (
    <nav className="cute">
      <ul
        onClick={() => {
          setCategory('청순카리나');
        }}
      >
        청순카리나
      </ul>

      <ul
        onClick={() => {
          setCategory('큐트카리나');
        }}
      >
        큐트카리나
      </ul>
      <ul
        onClick={() => {
          setCategory('섹시카리나');
        }}
      >
        섹시카리나
      </ul>
      <ul
        onClick={() => {
          setCategory('일상카리나');
        }}
      >
        일상카리나
      </ul>
    </nav>
  );
};

export default Menubar;
