import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./maincontens.css";
import { MainContentsProps } from "./maincomponent";
import { karinaData } from "../../types/contentType";

const MainContents: React.FC<MainContentsProps> = ({
  category,
  myarray,
  matchedItems,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log(myarray, "메인컨텐츠의 유동적으로 바뀌어야하는것.");
  //* 바로 특정 메뉴바 메인페이지 마운트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/karina?menubar=innocence&page=1`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setData(data); // 로드된 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const goToSecondMain = (uuid: string): void => {
    navigate(`/detail/${uuid}`);
  };
  const renderContent = (item: karinaData): React.ReactNode => {
    switch (category) {
      case "innocence":
        if (item.menubar === category) {
          return <div>청순카리나 관련 컨텐츠</div>;
        }
        break;
      case "cute":
        if (item.menubar === "cute") {
          return <div>큐트카리나 관련 컨텐츠</div>;
        }
        break;
      case "sexy":
        if (item.menubar === "sexy") {
          return <div>섹시카리나 관련 컨텐츠</div>;
        }
        break;
      case "daily":
        if (item.menubar === "daily") {
          return <div>일상카리나 관련 컨텐츠</div>;
        }
        break;
      default:
        return <div>기본 컨텐츠</div>;
    }
  };

  //* 검색결과가 있으면 검색결과 상태 렌더링 아니면, 원래 배열 렌더링
  //* myarray =변화하는값  data =초기
  const itemsToRender =
    matchedItems.length > 0
      ? matchedItems
      : myarray.length < data.length
        ? myarray
        : data;
  return (
    <main className="mainContents">
      {itemsToRender.length > 0 &&
        itemsToRender.slice(0, 12).map((item, index) => (
          <li
            key={item.uuid}
            className={`contents${index + 1}`}
            onClick={() => goToSecondMain(item.uuid)}
          >
            <img className="mainThumbNail" src={item.photosumnail} />
            <h1>{item.title}</h1>

            {renderContent(item)}
          </li>
        ))}
    </main>
  );
};

export default MainContents;

// 1. 메인컨텐츠 컴포넌트의 props의 타입은 category, 스트링이다.
// 2. 메인컨텐츠는 함수형컴포넌트(React.FC)이며, MainContensProps를 부모컴포넌트로 부터 받는다.
// 3. 받은 프롭스를 구조분해할당을 통해, category라는 매개변수를 받을수있게된다.

// </li>
//       <li className="contents9" onClick={goToSecondMain}>
//         {renderContent()}
//       </li> */}
