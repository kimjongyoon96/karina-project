// src/App.tsx
import React, { useState, useEffect, createContext, useContext } from "react";
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
  console.log(myInputData, "실시간업데이트되스난되는");
  const authContextValue: AuthContextType = { jwtToken, setJwtToken };

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

  //* 배열추가 함수, write 컴포넌트에서 사용
  const addToArray = (obj: karinaData) => {
    switch (category) {
      case "innocence":
        if (obj.menubar === category)
          setMyInnocenceArray([...innocenceArray, obj]);

        break;
      case "cute":
        if (obj.menubar === category) setMyCuteArray([...cuteArray, obj]);
        // console.log(myArray);
        // console.log("디버깅용");
        break;
      case "sexy":
        if (obj.menubar === category) setMySexyArray([...cuteArray, obj]);

        break;
      case "daily":
        if (obj.menubar === category) setMyDailyArray([...dailyArray, obj]);

        break;
      default:
        console.log("없는 카테고리 입니다.");
    }
  };

  // 빨강=>파랑을 전시바구니로 옮기는 로직
  // 옮기는 로직이니, 전시
  const replaceArray = (arrayToReset: any[]) => {
    setMyArray(arrayToReset);
    // console.log(arrayToReset);
  };

  // http://localhost:4000/api/karina
  // 메인페이지 용도
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/api/karina/`)
  //     .then((response) => response.json())
  //     .then((data) => setMyArray(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  //   console.log("최상위 컴포넌트의 UseEffect,언제실행되는가?");
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/karina/`
        );
        const data = await response.json();
        console.log(data);
        setMyArray(data);

        setMyInnocenceArray(
          data.filter((item) => item.menubar === "innocence")
        );
        setMyCuteArray(data.filter((item) => item.menubar === "cute"));
        setMyDailyArray(data.filter((item) => item.menubar === "daily"));
        setMySexyArray(data.filter((item) => item.menubar === "sexy"));
      } catch (error) {
        console.error("뭔가 잘못되었다", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/api/karina?menubar=innocence`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       replaceArray(data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/cookie`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("서버가 이상해");
        }
        const data = await response.json();
        setJwtToken(data);

        console.log(data.token, "내가받은 JWT 토큰입니다.");
      } catch (error) {
        console.error("잘못된 fetch 데이터", error);
      }
    };
    fetchData();
  }, []);
  // const isSignUpPage = location.pathname === "/signUp";

  // if (isSignUpPage) {
  //   return <SignUp />;
  // }
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
              <MainContens
                category={category}
                myarray={myArray}
                matchedItems={matchedItems}
              />
            }
          />
          <Route
            path="/write"
            element={
              <WritePage addToArray={addToArray} setCategory={setCategory} />
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
