import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./maincontens.css";
import { MainContentsProps } from "./maincomponent";

const MainContents: React.FC<MainContentsProps> = ({ category, myarray }) => {
  const navigate = useNavigate();

  const goToSecondMain = (): void => {
    navigate("/contact");
  };

  const renderContent = (): React.ReactNode => {
    switch (category) {
      case "청순카리나":
        return <div>청순카리나 관련 컨텐츠</div>;
      case "큐트카리나":
        return <div>큐트카리나 관련 컨텐츠</div>;
      case "섹시카리나":
        return <div>섹시카리나 관련 컨텐츠</div>;
      case "일상카리나":
        return <div>일상카리나 관련 컨텐츠</div>;
      default:
        return <div>기본 컨텐츠</div>;
    }
  };

  return (
    <main className="mainContents">
      {myarray.length > 0 &&
        myarray.map((item, index) => (
          <li
            key={index}
            className={`contents${index + 1}`}
            onClick={goToSecondMain}
          >
            {renderContent()}
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
