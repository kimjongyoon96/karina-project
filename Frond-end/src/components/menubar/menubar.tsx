import React, { useState } from "react";
import "./menubar.css";
import useAuthStore from "../../JustAnd/GlobalState";
import { useNavigate } from "react-router-dom";

//* 클릭이벤트가 발생하면, handleMenubar 함수가 실행되고, 매개변수로 전달된 문자열이  setCurrentMenubar의 상태로 저장된다 즉, click "jang" => currentMenubar==="jang"
//* 매개변수로 받은 문자열로 해당 쿼리문을 포함한 요청을 서버로 보낸다 즉 "장원영 메뉴바에 해당하는 데이터를 가져온다."
//* 그값은, 필시 json 형태의 장원영 메뉴바 키를 가진 데이터일것이고, 그것을 replacceArray 매개변수 전달
//* replaceArray 함수는 최상위 컴포넌트에 존재한다.
//* 그렇다면 기존 로직을 이용해서,
const Menubar: React.FC = () => {
  const { collaboClick, setCollaboClick } = useAuthStore(
    (state) => state.isCollabo
  );
  const { mainContentsData, setMainContentsData } = useAuthStore(
    (state) => state.mainContentsGlobal
  );

  const navigate = useNavigate();
  const handleMenubar = (menubar) => {
    navigate(`/menubar/${menubar}`);
    
    //     );
    //     if (!response.ok) {
    //       throw new Error("에러가 발생했습니다.");
    //     }
    //     const data = await response.json();
    //     console.log(data);
    //     setMainContentsData(data);
    //     //* 여기에 상태변경 함수를 넣어서 전역으로 관리하자.
    //   };
    //   fetchData();
    // };
    // const handleCollabo = (collabo: string) => {
    //   setCollaboClick(collabo);
    //   console.log(collabo, "콜라보레이션");
  };
  const handleCollabo = (collabo) => {
    navigate(`/collabo/${collabo}`);
  };
  return (
    <nav className="menubar-container">
      <ul onClick={() => handleMenubar("jang")}>장원영</ul>

      <ul onClick={() => handleMenubar("karina")}>카리나</ul>
      <ul className="sparkle" onClick={() => handleCollabo("collabo")}>
        나와장카설유
      </ul>
      <ul onClick={() => handleMenubar("sulyoon")}>설윤</ul>
      <ul onClick={() => handleMenubar("yoona")}>유나</ul>
    </nav>
  );
};

export default Menubar;

// 1. 이 코드는 메뉴바로, 버튼 클릭시 원하는 카리나의 사진이 보여야 한다.
// 2. menubarProps는 setCategory 함수를 prop으로 정하며, 문자열인 category 매개변수를 받으며, 반환값은 없다(void)
//3. React.FC는 함수형 컴포넌트를 의미,
