import React, { useEffect } from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../types/contentType";

const SeachBar: React.FC<AuthContextType> = ({ jwtToken, setJwtToken }) => {
  const navigate = useNavigate();

  const goToSecondMain = (): void => {
    if (jwtToken) {
      navigate("/write");
    } else {
      console.log(jwtToken);
      alert("로그인 하셔야 글쓰기가 가능합니다.");
    }
  };

  return (
    <div className="searchwrap">
      {/* <div
        className="lefttitle { 제목
"
      >
        제목:
      </div> */}
      {/* <input className="seachbox"></input> */}

      <div className="spacer"></div>
      <button className="writebox" onClick={goToSecondMain}>
        글쓰기
      </button>
    </div>
  );
};

export default SeachBar;
