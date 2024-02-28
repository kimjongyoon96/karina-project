import React, { useState } from "react";
import "./menubar.css";
import { karinaData } from "../../types/contentType";
// MenubarProps 타입 정의
interface MenubarProps {
  replaceArray: (arrayToReset: any[]) => void;
  setCurrentMenubar: (currentMenubar: string) => void;
}

function Menubar({ replaceArray, setCurrentMenubar }) {
  const handleMenubar = (menubar) => {
    setCurrentMenubar(menubar);

    fetch(`${process.env.REACT_APP_API_URL}/api/karina?menubar=${menubar}`)
      .then((response) => response.json())
      .then((data) => replaceArray(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => console.log(`${menubar}가 눌러졌군..`));
  };
  return (
    <nav className="cute">
      <ul onClick={() => handleMenubar("innocence")}>청순카리나</ul>

      <ul onClick={() => handleMenubar("cute")}>큐트카리나</ul>
      <ul onClick={() => handleMenubar("sexy")}>섹시카리나</ul>
      <ul onClick={() => handleMenubar("daily")}>일상카리나</ul>
    </nav>
  );
}

export default Menubar;

// 1. 이 코드는 메뉴바로, 버튼 클릭시 원하는 카리나의 사진이 보여야 한다.
// 2. menubarProps는 setCategory 함수를 prop으로 정하며, 문자열인 category 매개변수를 받으며, 반환값은 없다(void)
//3. React.FC는 함수형 컴포넌트를 의미,
