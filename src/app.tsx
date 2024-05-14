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
import NonSocialLogin from "./nonSocialLogin/nonSocialLogin";
import RecoverUserInfo from "./components/recoverUserInfo/recoverUserInfo";
import FindUserPw from "./components/findUserPw/findUserPw";
import MyPage from "./components/myPage/myPage";
import useAuthStore from "./JustAnd/GlobalState";
import AuthManager from "./containers/container";
import { response } from "express";
const App: React.FC = () => {
  const [category, setCategory] = useState("");
  const [currentMenubar, setCurrentMenubar] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  console.log(currentPage, "클릭한페이지의값");
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [myArray, setMyArray] = useState<karinaData[]>([]); //전시바구니
  const [innocenceArray, setMyInnocenceArray] = useState<karinaData[]>([]); //빨강바구니
  const [cuteArray, setMyCuteArray] = useState<karinaData[]>([]); // 파란바구니
  const [sexyArray, setMySexyArray] = useState<karinaData[]>([]);
  const [dailyArray, setMyDailyArray] = useState<karinaData[]>([]); // 초록바구니
  const [matchedItems, setMatchedItems] = useState<karinaData[]>([]);
  const [myInputData, setMyInputData] = useState("");
  // console.log(myInputData, "실시간업데이트되스난되는");
  const authContextValue: AuthContextType = { jwtToken, setJwtToken };
  const { jwtExpired, setJwtExpired } = useAuthStore();
  console.log(jwtExpired, "여기가 저스탠드");
  //* 서치바 컴포넌트 조건부 렌더링
  const ShowSeachbar = () => {
    const location = useLocation();

    if (
      location.pathname !== "/write" &&
      !location.pathname.startsWith("/detail") &&
      !location.pathname.startsWith("/SignUp")
    ) {
      return (
        <SeachBar
          jwtToken={jwtToken}
          setJwtToken={setJwtToken}
          myArray={myArray}
          matchedItems={matchedItems}
          setMatchedItems={setMatchedItems}
          setMyInputData={setMyInputData}
          myInputData={myInputData}
        />
      );
    }

    return null;
  };
  //* 마이페이지 조건부 렌더링 함수
  //  myPage =()=>{
  //   const location = useLocation();

  //   if

  // }
  //* 배열추가 함수, write 컴포넌트에서 사용
  const addToArray = (obj: karinaData) => {
    switch (category) {
      case "jang":
        if (obj.menubar === category)
          setMyInnocenceArray([...innocenceArray, obj]);

        break;
      case "karina":
        if (obj.menubar === category) setMyCuteArray([...cuteArray, obj]);
        console.log("addToArray 테스트:", cuteArray, myArray);
        break;
      case "sulyoon":
        if (obj.menubar === category) setMySexyArray([...sexyArray, obj]);

        break;
      case "yoona":
        if (obj.menubar === category) setMyDailyArray([...dailyArray, obj]);

        break;
      default:
        console.log("없는 카테고리 입니다.");
    }
  };

  //* 1. 메뉴바를 클릭시 handle 함수가 실행되어, 해당 menubar가 속한 데이터를 가져옴.
  //* 2. 그 data를 replaceArray(data)에 넣음 , 이 data는 해당 메뉴바에 속한 데이터
  //* 3. setMyArray의 상태는 myArray 즉, 메뉴바가 클릭될때마다 myArray가 동적으로 바뀜
  const replaceArray = (arrayToReset: any[]) => {
    setMyArray(arrayToReset);
    // console.log("이것은필시 메뉴바에 해당하는 data:", arrayToReset);
  };
  //* 1. 페이지가 마운트 되었을때 모든 게시물을 가져온다.
  //*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/karina/`
        );
        const data = await response.json();
        console.log("메인페이지 useEffect 발생:", data);
        setMyArray(data);

        setMyInnocenceArray(data.filter((item) => item.menubar === "jang"));
        setMyCuteArray(data.filter((item) => item.menubar === "karina"));
        setMyDailyArray(data.filter((item) => item.menubar === "sulyoon"));
        setMySexyArray(data.filter((item) => item.menubar === "yoona"));
      } catch (error) {
        console.error("뭔가 잘못되었다", error);
      }
    };
    fetchData();
  }, []);
  // * 쿠키에 있는 JWT 가져오기
  //* 토큰이 있을때만, useEffect 실행 =>
  useEffect(() => {
    const fetchData = async () => {
      if (!jwtToken) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/auth/cookie`,
            {
              credentials: "include",
            }
          );
          if (response.status === 404) {
            setJwtExpired(true); // 서버에서 받은 status가 403이면, 만료되었다고 판단
            console.log("실시간으로 바뀌나 보자:", jwtExpired);
          }
          const data = await response.json();
          setJwtToken(data);

          console.log(data.token, "내가받은 JWT 토큰입니다.");
        } catch (error) {
          console.error("잘못된 fetch 데이터", error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Header {...authContextValue} />
        <Menubar
          replaceArray={replaceArray}
          setCurrentMenubar={setCurrentMenubar}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainContens
                  category={category}
                  myarray={myArray}
                  matchedItems={matchedItems}
                />
                <AuthManager />
              </>
            }
          />
          <Route
            path="/write"
            element={
              <WritePage
                addToArray={addToArray}
                setCategory={setCategory}
                jwtToken={jwtToken}
              />
            }
          />
          <Route
            path="/searchRender"
            element={
              <SerachRender
                matchedItems={matchedItems}
                myInputData={myInputData}
              />
            }
          />
          <Route
            path="/detail/:uuid"
            element={
              <DetailPage
                myArray={myArray}
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
              />
            }
          />
          <Route path="signUp" element={<SignUp />} />
          <Route path="addNickName" element={<Nickname />} />
          <Route path="nonSocialLogin" element={<NonSocialLogin />} />
          <Route path="recoverUser" element={<RecoverUserInfo />} />
          <Route path="findUserPw" element={<FindUserPw />} />
          <Route
            path="myPage"
            element={<MyPage jwtToken={jwtToken} setJwtToken={setJwtToken} />}
          />
        </Routes>
        <ShowSeachbar />
        {/* <SeachBar {...authContextValue} /> */}

        <Number
          replaceArray={replaceArray}
          setCurrentPage={setCurrentPage}
          currentMenubar={currentMenubar}
          currentPage={currentPage}
        />
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
