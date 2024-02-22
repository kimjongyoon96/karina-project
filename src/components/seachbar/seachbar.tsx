import React, { useEffect, useState } from "react";
import "./seach.css";
import { useNavigate } from "react-router-dom";
import { AuthContextType, karinaData } from "../../types/contentType";
interface SearchBarProps extends AuthContextType {
  myArray: karinaData[];
}
const SeachBar: React.FC<SearchBarProps> = ({
  jwtToken,
  setJwtToken,
  myArray,
}) => {
  const [myInputData, setMyInputData] = useState("");
  const [matchedItems, setMatchedItems] = useState<karinaData[]>([]);
  const navigate = useNavigate();
  const goToSecondMain = (): void => {
    if (jwtToken) {
      navigate("/write");
    } else {
      console.log(jwtToken);
      alert("로그인 하셔야 글쓰기가 가능합니다.");
    }
  };
  const handleChange = (event) => {
    // 현재 입력 필드의 값을 상태로 설정
    setMyInputData(event.target.value);
  };
  const whatIsArray = () => {
    const foundItems = myArray.filter((item) => item.title === myInputData);

    if (foundItems.length > 1) {
      console.log("매치되는 검색결과가 있습니다.");
      setMatchedItems(foundItems);
    } else {
      console.log("데이터가 없는데요?");
      alert("데이터가 없습니다.");
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
