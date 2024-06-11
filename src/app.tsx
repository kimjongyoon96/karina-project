// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { karinaData, AuthContextType } from "./types/contentType";
import Header from "./components/header/header"; // Header 컴포넌트 임포트
import Menubar from "./components/menubar/menubar";
import MainContens from "./components/maincontens/maincontens";
import SeachBar from "./components/seachbar/seachbar";
import Number from "./components/movepage/movepage";
import DetailPage from "./components/detailPage/detailPage";
import WritePage from "./components/writePage/writePage";
import SignUp from "./components/signUp/signUp";
import SerachRender from "./components/searchRendering/searchRendering";
import Nickname from "./components/soical-nickName/nickName";
import NonSocialLogin from "./components/nonSocialLogin/nonSocialLogin";
import RecoverUserInfo from "./components/recoverUserInfo/recoverUserInfo";
import FindUserPw from "./components/findUserPw/findUserPw";
import MyPage from "./components/myPage/myPage";
import useAuthStore from "./JustAnd/GlobalState";
// import AuthManager from "./containers/container";
import UpdateProfile from "./components/updateProfile/updateProfile";
import UserProfileUpdate from "./components/userProfileUpdate/userProfileUpdate";
import MyInfoUpdate from "./components/myinfoUpdate/myInfoUpdate";
import Modal from "./components/customComponent/signModalComponent/signModalForJwtExpired";
import Alert from "./components/customComponent/signModalComponent/signModalComponent";
import FetchAndNavigate from "./components/immitationApp";
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("");
  console.log(currentPage, "클릭한페이지의값");

  const { jwtDecodingData } = useAuthStore((state) => state.jwtGlobal); //* authStore JWT전역
  console.log(
    jwtDecodingData,
    "전역으로 설정한 값인데, 객체형태로 나와야하낟."
  );
  console.log("헤더에 들어가는 jwt:", jwtDecodingData?.["token"]);
  //* 서치바 컴포넌트 조건부 렌더링
  const ShowSeachbar = () => {
    const location = useLocation();

    if (
      location.pathname !== "/write" &&
      !location.pathname.startsWith("/detail") &&
      !location.pathname.startsWith("/SignUp") &&
      !location.pathname.startsWith("/nonSocialLogin") &&
      !location.pathname.startsWith("/myPage") &&
      !location.pathname.startsWith("/UpdateProfile") &&
      !location.pathname.startsWith("/searchRender")
    ) {
      return <SeachBar />;
    }

    return null;
  };
  // const ShowMenubar = () => {
  //   const location = useLocation();
  //   if (!location.pathname.startsWith("/nonSocialLogin")) {
  //     return <Menubar />;
  //   }
  // };

  const ShowPagiNation = () => {
    const location = useLocation();
    if (
      !location.pathname.startsWith("/nonSocialLogin") &&
      !location.pathname.startsWith("/detail") &&
      !location.pathname.startsWith("/SignUp") &&
      !location.pathname.startsWith("/myPage") &&
      !location.pathname.startsWith("/UpdateProfile") &&
      !location.pathname.startsWith("/write") &&
      !location.pathname.startsWith("/searchRender")
    ) {
      return <Number />;
    }
  };
  //* 장원영 메뉴바를 포함한 데이터를 가진 배열을 replaceArray의 매개변수에 할당
  //* replaceArray의 매개변수는 arrayToRest, 이것은 setMyArray의 상태
  //* 즉, 최종적으로 setMyArray에 장원영 데이터가 포함, 이것은 MyArray의 값이 장원영인 상태
  //* 최종적으로 myArray의 상태를 공유하는 메인컴포넌트에서 이값을 통해서 렌더링 한다.
  // const replaceArray = (arrayToReset: any[]) => {
  //   setMyArray(arrayToReset);
  // };

  return (
    <Router>
      <div>
        <FetchAndNavigate />
        <Alert />
        <Header />
        <Menubar />
        <Routes>
          <Route path="/" element={<MainContens />} />
          <Route path="/menubar/:menubar" element={<MainContens />} />
          <Route path="collabo/:collabo" element={<MainContens />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/searchRender" element={<SerachRender />} />
          <Route path="/detail/:uuid" element={<DetailPage />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="addNickName" element={<Nickname />} />
          <Route path="nonSocialLogin" element={<NonSocialLogin />} />
          <Route path="recoverUser" element={<RecoverUserInfo />} />
          <Route path="findUserPw" element={<FindUserPw />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="userProfileUpdate" element={<UserProfileUpdate />} />
          <Route path="myInfoUpdate" element={<MyInfoUpdate />} />
        </Routes>
        <ShowSeachbar />
        <ShowPagiNation />
      </div>
    </Router>
  );
};

export default App;

// 1.최상위 컴포넌트에서 category 라는 상태를 정의한다. 그 상태의 초기값은 '청순카리나'
// 2.상태(category)와 상태를 변경하는 함수(setCategory)가 정의된다.
// 3. setCategory함수는 prop을 통해서 하위 컴포넌트에 전달이된다.
// 4. 이렇게 하여.Menubar 컴포넌트에서 setCategory 함수를 쓸수있게된다.
// 5. 사용자가 특정 버튼을 클릭하면, setCategory가 호출이된다.
// 6. 이 함수 호출은, 새로운 category값을 인자로 전달한다. 예를들어서, "큐트카리나" 클릭시
// setCategory("큐트카리나") 가 호출이된다.
// 7. 이때, setCategory 함수의 호출은 최상위 컴포넌트의 category 상태를 업데이트한다.
// 8. 즉, 최상위 컴포넌트에서 useState를 통해 변수와 함수를 정하고, 프롭스라는 통로를 연다.
// 9. 하위 컴포넌트는 프롭스를 받아서, 구조분해할당을 통해 함수를 추출하여 사용한다.

// 최상위 컴포넌트에 배열로 만들 객체를 useState로 만든다.
// main에서 useState의 객체를 프롭스로 받아서, 그 값으로 Mpa()사용해서 9개를 만든다.
//
