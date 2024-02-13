import React from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";

const SeachBar: React.FC = () => {
  const navigate = useNavigate();

  const goToSecondMain = (): void => {
    navigate("/write");
  };

  return (
    <div className="searchwrap">
      <div
        className="lefttitle { 제목
"
      >
        제목:
      </div>
      <input className="seachbox"></input>
      <div className="spacer"></div>
      <button className="writebox" onClick={goToSecondMain}>
        글쓰기
      </button>
    </div>
  );
};

export default SeachBar;
