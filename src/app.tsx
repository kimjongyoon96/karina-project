// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { karinaData } from "./types/contentType";
import Header from "./components/header/header"; // Header 컴포넌트 임포트
import Menubar from "./components/menubar/menubar";
import MainContens from "./components/maincontens/maincontens";
import SeachBar from "./components/seachbar/seachbar";
import Number from "./components/movepage/movepage";
import DetailPage from "./components/detailPage/detailPage";
import WritePage from "./components/writePage/writePage";
const App: React.FC = () => {
  const [category, setCategory] = useState("청순카리나");
  const [myArray, setMyArray] = useState<karinaData[]>([]);
  // 2. 배열을 만들 작동 함수
  const addToArray = (obj: karinaData) => {
    setMyArray([...myArray, obj]);
    console.log(myArray);
  };

  return (
    <Router>
      <div>
        <Header />
        <Menubar setCategory={setCategory} />
        <Routes>
          <Route
            path="/"
            element={<MainContens category={category} myarray={myArray} />}
          />
          <Route path="/contact" element={<DetailPage />} />
          <Route
            path="/write"
            element={
              <WritePage
                addToArray={addToArray}
                // setCategory={setCategory}
                // category={category}
              />
            }
          />
        </Routes>

        {/* /write 경로가 아닐 때만 SeachBar와 Number를 렌더링 */}
        {location.pathname !== "/write" && (
          <>
            <SeachBar />
            <Number />
          </>
        )}
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
