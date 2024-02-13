import React from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

const SeachBar: React.FC = () => {
  const navigate = useNavigate();
  const { jwtToken } = useAuth();
  const goToSecondMain = (): void => {
    if (jwtToken) {
      navigate("/write");
    } else {
      alert("회원만 글쓰기가 가능합니다.");
    }
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
