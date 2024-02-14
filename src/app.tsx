// src/App.tsx
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { karinaData, AuthContextType } from "./types/contentType";
import Header from "./components/header/header"; // Header 컴포넌트 임포트
import Menubar from "./components/menubar/menubar";
import MainContens from "./components/maincontens/maincontens";
import SeachBar from "./components/seachbar/seachbar";
import Number from "./components/movepage/movepage";
import DetailPage from "./components/detailPage/detailPage";
import WritePage from "./components/writePage/writePage";
import SignUp from "./components/signUp/signUp";
import { AuthProvider } from "../src/authContext";
// import { useAuth } from "../src/authContext";
import { response } from "express";
import SimpleInputComponent from "./components/Test";
// import Cute from "./cute";

const App: React.FC = () => {
  // const { setJwtToken } = useAuth();
  const [category, setCategory] = useState("청순카리나");
  // console.log(category); // 청순카리나,큐트카리나 문자열
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const authContextValue: AuthContextType = { jwtToken, setJwtToken };
  const [myArray, setMyArray] = useState<karinaData[]>([]); //전시바구니
  const [redArray, setMyRedArray] = useState<karinaData[]>([]); //빨강바구니
  const [blueArray, setMyBlueArray] = useState<karinaData[]>([]); // 파란바구니
  // useEffect(() => {
  //   console.log("Updated redArray:", blueArray);
  // }, [blueArray]);
  const [yellowArray, setMyYellowArray] = useState<karinaData[]>([]); //노랑바구니
  const [greenArray, setMyGreenArray] = useState<karinaData[]>([]); // 초록바구니
  // console.log(myArray); // karinaData의 값들출력

  // 2. 배열을 만들 작동 함수
  // 배열을 추가할때는 빨강 빨강 파랑 파랑 노랑 노랑
  // setMyRedArray,setMyBuleArray
  const addToArray = (obj: karinaData) => {
    switch (category) {
      case "청순카리나":
        console.log("Before updating redArray:", redArray);
        if (obj.menubar === category) setMyRedArray([...redArray, obj]);

        break;
      case "큐트카리나":
        if (obj.menubar === category) setMyBlueArray([...blueArray, obj]);
        // console.log(myArray);
        // console.log("디버깅용");
        break;
      case "섹시카리나":
        if (obj.menubar === category) setMyYellowArray([...yellowArray, obj]);

        break;
      case "일상카리나":
        if (obj.menubar === category) setMyGreenArray([...greenArray, obj]);

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
  // 메인페이지 용도
  useEffect(() => {
    fetch("http://localhost:4000/api/karina")
      .then((response) => response.json())
      .then((data) => setMyArray(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log("카리나 테스트입니다.");
  }, []); // 빈 종속성 배열로 마운트 시에만 실행

  // 상태 => 하위 컴포넌트로 뿌려주기
  // credential을 포함하여 쿠키 안에 있는 JWT에 접근하기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/auth/cookie", {
          credentials: "include",
        });
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
  return (
    // <AuthProvider>
    <Router>
      <div>
        <Header />
        <Menubar
          setCategory={setCategory}
          replaceArray={replaceArray}
          redArray={redArray}
          blueArray={blueArray}
          yellowArray={yellowArray}
          greenArray={greenArray}
        />

        <Routes>
          <Route
            path="/"
            element={<MainContens category={category} myarray={myArray} />}
          />
          <Route
            path="/write"
            element={<WritePage addToArray={addToArray} />}
          />
          <Route
            path="/detail/:uuid"
            element={<DetailPage myArray={myArray} />}
          />
          <Route path="signUp" element={<SignUp />} />
          <Route path="/testyong" element={<SimpleInputComponent />} />
        </Routes>

        <SeachBar {...authContextValue} />

        <Number />
        {/* <Cute /> */}
      </div>
    </Router>
    // </AuthProvider>
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
