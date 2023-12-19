import React, { useState } from "react";
import "./menubar.css";

// MenubarProps 타입 정의
interface MenubarProps {
  setCategory: (category: string) => void; // setCategory 함수의 타입 정의
}
// 부모 컴포넌트(최상위)에서 받은 MenubarProps는 menubarProps 타입의 prop를 받는다.
// setCategory는, 구조분해 할당을 통하여, props 객체에서 setCategory 함수를 추출한다.
const Menubar: React.FC<MenubarProps> = ({ setCategory }) => {
  return (
    <nav className="cute">
      <ul
        onClick={() => {
          setCategory("청순카리나");
        }}
      >
        청순카리나
      </ul>

      <ul
        onClick={() => {
          setCategory("큐트카리나");
        }}
      >
        큐트카리나
      </ul>
      <ul
        onClick={() => {
          setCategory("섹시카리나");
        }}
      >
        섹시카리나
      </ul>
      <ul
        onClick={() => {
          setCategory("일상카리나");
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
