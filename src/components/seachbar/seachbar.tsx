import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType, karinaData } from "../../types/contentType";
import { response } from "express";
interface SearchBarProps extends AuthContextType {
  myArray: karinaData[];
  matchedItems: karinaData[]; // 선택적 속성으로 추가
  setMatchedItems: Dispatch<SetStateAction<karinaData[]>>;
}
const SeachBar: React.FC<SearchBarProps> = ({
  jwtToken,
  myArray,
  matchedItems,
  setMatchedItems,
}) => {
  //*상태 끌어올리기 (state Lifting)로 최상위 컴포넌트로 전달
  const [myInputData, setMyInputData] = useState("");
  // const [matchedItem, setMatchedItems] = useState<karinaData[]>([]);
  const navigate = useNavigate();
  const goToSecondMain = (): void => {
    if (jwtToken) {
      navigate("/write");
    } else {
      console.log(jwtToken);
      alert("로그인 하셔야 글쓰기가 가능합니다.");
    }
  };
  //* 사용자 입력 받는 함수
  const handleChange = (event) => {
    // 현재 입력 필드의 값을 상태로 설정
    setMyInputData(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      whatIsArraye();
    }
  };
  //* 검색결과 반환하는 함수 => 검색결과에 대한 배열 생성
  // const whatIsArray = () => {
  //   const foundItems = myArray.filter((item) => item.title === myInputData);
  //   console.log(foundItems, "검색결과는 무엇입니까?");

  //   if (foundItems.length > 0) {
  //     console.log("매치되는 검색결과가 있습니다.");
  //     setMatchedItems(foundItems);
  //     goToSearchRendering();
  //   } else {
  //     console.log("데이터가 없는데요?");
  //     alert("검색 결과가 없습니다.");
  //   }
  // };
  //* myArray 대신 동적인 요청을 위한 새로운 함수
  const whatIsArraye = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/research?search=${myInputData}`
      );
      const data = await response.json();
      if (data.length > 0) {
        console.log("매치되는 검색어가 있습니다");
      } else {
        alert("검색결과 없다");
      }
      setMatchedItems(data);
      goToSearchRendering();
      if (!response.ok) {
        throw new Error(`error :${response.status}`);
      }
    } catch (error) {
      console.error(error, "검색 결과 로직에서 에러가 났다.");
    }
  };

  //* 검색결과 렌더링 Usenavigate
  const goToSearchRendering = (): void => {
    navigate(`/searchRender`);
  };
  return (
    <div className="searchwrap">
      <div className="lefttitle">제목:</div>
      <input
        className="seachbox"
        value={myInputData} // input 태그의 value를 상태와 연결
        onChange={handleChange} // 입력 시 handleChange 함수 호출
        onKeyPress={handleKeyPress}
      ></input>
      <button onClick={whatIsArraye}></button>

      <button className="writebox" onClick={goToSecondMain}>
        글쓰기
      </button>
    </div>
  );
};

export default SeachBar;
