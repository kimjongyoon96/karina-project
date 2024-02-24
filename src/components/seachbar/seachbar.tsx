import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType, karinaData } from "../../types/contentType";
interface SearchBarProps extends AuthContextType {
  myArray: karinaData[];
  matchedItems: karinaData[]; // 선택적 속성으로 추가
  setMatchedItems: Dispatch<SetStateAction<karinaData[]>>;
}
const SeachBar: React.FC<SearchBarProps> = ({
  jwtToken,
  setJwtToken,
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
  //* 검색결과 반환하는 함수 => 검색결과에 대한 배열 생성
  const whatIsArray = () => {
    const foundItems = myArray.filter((item) => item.title === myInputData);
    console.log(foundItems, "검색결과는 무엇입니까?");

    if (foundItems.length > 0) {
      console.log("매치되는 검색결과가 있습니다.");
      setMatchedItems(foundItems);
    } else {
      console.log("데이터가 없는데요?");
      alert("검색 결과가 없습니다.");
    }
  };
  return (
    <div className="searchwrap">
      <div className="lefttitle">제목:</div>
      <input
        className="seachbox"
        value={myInputData} // input 태그의 value를 상태와 연결
        onChange={handleChange} // 입력 시 handleChange 함수 호출
      ></input>
      <button onClick={whatIsArray}></button>

      <button className="writebox" onClick={goToSecondMain}>
        글쓰기
      </button>
    </div>
  );
};

export default SeachBar;
