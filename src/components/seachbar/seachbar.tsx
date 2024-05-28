import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType, karinaData } from "../../types/contentType";
import { response } from "express";
import { Template } from "webpack";
import useAuthStore from "../../JustAnd/GlobalState";
import Modal from "../customComponent/signModalComponent/signModalForJwtExpired";

const SeachBar: React.FC = () => {
  const [tempInput, setTempInput] = useState(""); // 검색 결과 임시데이터
  const { jwtDecodingData } = useAuthStore((state) => state.jwtGlobal);
  const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } =
    useAuthStore((state) => state.alertState);
  const { researchInputData, setReserchInputData } = useAuthStore(
    (state) => state.researchInputGlobal
  );
  console.log(researchInputData, "검색전역상태");
  //* 글쓰기 컴포넌트로 이동 함수
  const navigate = useNavigate();
  const goToSecondMain = (): void => {
    if (jwtDecodingData !== null) {
      navigate("/write");
    } else {
      setAllertMessage("로그인 하셔야 글쓰기가 가능합니다. 로그인 하시겠어요?");
      showAlertMessage();
      setConfirmAction(() => {
        hideAlert();
        navigate("/signUp");
      });
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
    setReserchInputData(tempInput);
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
