import React, { useState } from "react";
import "./menubar.css";
import { karinaData } from "../../types/contentType";
// MenubarProps 타입 정의
interface MenubarProps {
  setCategory: (category: string) => void;
  replaceArray: (arrayToReset: any[]) => void;
  redArray: any[];
  blueArray: any[];
  yellowArray: any[];
  greenArray: any[];
}
// 메뉴바를 선언할꺼야! 메뉴바는 리액트의 함수형 컴포넌트이며, <MenubarProps>를 props를 통해 받았어!
// 여기서, setCategory를 구조분해 할당을 통해 쓸수있게 되었어!
const Menubar: React.FC<MenubarProps> = ({
  setCategory,
  replaceArray,
  redArray,
  blueArray,
  yellowArray,
  greenArray,
}) => {
  return (
    <nav className="cute">
      <ul
        onClick={() => {
          setCategory("청순카리나");
          replaceArray(redArray);
          // console.log(redArray);
          // console.log("redArray");
        }}
      >
        청순카리나
      </ul>

      <ul
        onClick={() => {
          setCategory("큐트카리나");
          replaceArray(blueArray);
          // console.log(blueArray);
          // console.log("여기블루");
        }}
      >
        큐트카리나
      </ul>
      <ul
        onClick={() => {
          setCategory("섹시카리나");
          replaceArray(yellowArray);
        }}
      >
        섹시카리나
      </ul>
      <ul
        onClick={() => {
          setCategory("일상카리나");
          replaceArray(greenArray);
        }}
      >
        일상카리나
      </ul>
    </nav>
  );
};

export default Menubar;

// 1. 이 코드는 메뉴바로, 버튼 클릭시 원하는 카리나의 사진이 보여야 한다.
// 2. menubarProps는 setCategory 함수를 prop으로 정하며, 문자열인 category 매개변수를 받으며, 반환값은 없다(void)
//3. React.FC는 함수형 컴포넌트를 의미,
