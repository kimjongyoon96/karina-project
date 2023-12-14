import React from 'react';
import './movepage.css'; // CSS 파일 임포트

const Number: React.FC = () => {
  return (
    <div className="number-container">
      <button className="page-button">1</button>
      <button className="page-button">2</button>
      <button className="page-button">3</button>
      <button className="page-button">4</button>
      <button className="page-button">5</button>
    </div>
  );
};

export default Number;
