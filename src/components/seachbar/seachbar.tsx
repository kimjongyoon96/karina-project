import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType, karinaData } from "../../types/contentType";
import { response } from "express";
import { Template } from "webpack";
interface SearchBarProps extends AuthContextType {
  myArray: karinaData[];
  matchedItems: karinaData[]; // 선택적 속성으로 추가
  setMatchedItems: Dispatch<SetStateAction<karinaData[]>>;
  setMyInputData: (string) => void;
  myInputData: string;
}
const SeachBar: React.FC<SearchBarProps> = ({
  jwtToken,
  myArray,
  matchedItems,
  setMatchedItems,
  setMyInputData,
  myInputData,
}) => {
  const [tempInput, setTempInput] = useState(""); // 검색 결과 임시데이터
  //* 글쓰기 컴포넌트로 이동 함수
  const navigate = useNavigate();
  const goToSecondMain = (): void => {
    if (jwtToken) {
      navigate("/write");
    } else {
      console.log(jwtToken, "글쓰기 컴포넌트에 들어가야되느데");
      alert("로그인 하셔야 글쓰기가 가능합니다.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const goToSearchRendering = (): void => {
    navigate(`/searchRender`);
  };
  const handleChange = (e) => {
    setTempInput(e.target.value); // 사용자 입력을 임시 상태에 저장
  };
  const handleSearch = () => {
    setMyInputData(tempInput); // 검색 버튼 클릭 시 최상위 컴포넌트의 상태 업데이트
    goToSearchRendering();
  };
  //* 검색결과 렌더링 Usenavigate
  return (
    <div className="searchwrap">
      <div className="lefttitle">검색</div>
      <input
        className="seachbox"
        value={tempInput} // input 태그의 value를 상태와 연결
        onChange={handleChange} // 입력 시 handleChange 함수 호출
        onKeyPress={handleKeyPress}
      ></input>
      <button className="button-search" onClick={handleSearch}></button>

      <button className="writebox" onClick={goToSecondMain}>
        글쓰기
      </button>
    </div>
  );
};

export default SeachBar;
