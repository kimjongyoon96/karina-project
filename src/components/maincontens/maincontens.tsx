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
  console.log(matchedItems, "음하하하!!!");
  // console.log(category); // 청순카리나,섹시카리나 맞게 출력
  // console.log(myarray); // 추가된 배열정보 즉, karinadata의 배열
  // console.log("여기뭐가나오냐");
  const goToSecondMain = (uuid: string): void => {
    navigate(`/detail/${uuid}`);
  };
  const renderContent = (item: karinaData): React.ReactNode => {
    // console.log(item, "메인컨텐츠에서 아이템의값입니다.");
    switch (category) {
      case "청순카리나":
        if (item.menubar === "innocence") {
          return <div>청순카리나 관련 컨텐츠</div>;
        }
        break;
      case "큐트카리나":
        if (item.menubar === "cute") {
          return <div>큐트카리나 관련 컨텐츠</div>;
        }
        break;
      case "섹시카리나":
        if (item.menubar === "sexy") {
          return <div>섹시카리나 관련 컨텐츠</div>;
        }
        break;
      case "일상카리나":
        if (item.menubar === "daily") {
          return <div>일상카리나 관련 컨텐츠</div>;
        }
        break;
      default:
        return <div>기본 컨텐츠</div>;
    }
  };

  const itemsToRender =
    matchedItems && matchedItems.length > 0 ? matchedItems : myarray;
  // item => myarray의 각 객체, index=> 배열 내의 해당 객체의 인덱스값
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
