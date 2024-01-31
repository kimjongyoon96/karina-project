// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { karinaData } from "./types/contentType";
import Header from "./components/header/header"; // Header 컴포넌트 임포트
import Menubar from "./components/menubar/menubar";
import MainContens from "./components/maincontens/maincontens";
import SeachBar from "./components/seachbar/seachbar";
import Number from "./components/movepage/movepage";
import DetailPage from "./components/detailPage/detailPage";
import WritePage from "./components/writePage/writePage";
import Cute from "./cute";
const App: React.FC = () => {
  const [category, setCategory] = useState("청순카리나");
  // console.log(category); // 청순카리나,큐트카리나 문자열
  // const chungsoonKarina: karinaData = {
  //   id: 1,
  //   menubar: "청순카리나",
  //   title: "카리나존예",
  //   description: "카리나가짱",
  //   photo: "https://cdn.mhnse.com/news/photo/202311/240620_252535_5240.jpg",
  // };
  const [myArray, setMyArray] = useState<karinaData[]>([
    // {
    //   uuid: "8acd31b7-99ce-4d28-bdff-4ac75c0fbcb4",
    //   menubar: "청순카리나",
    //   title: "dd",
    //   photosumnail:
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685139426-pagelogo.jpeg",
    //   photo: [
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685139436-pagelogo.jpeg",
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685139496-cat.jpg",
    //   ],
    // },
    // {
    //   uuid: "dcdebdef-dcce-4fcf-b743-c2e3115f6dfd",
    //   menubar: "청순카리나",
    //   title: "dd",
    //   photosumnail:
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685413248-pagelogo.png",
    //   photo: [
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685413258-pagelogo.jpeg",
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685413317-cat.jpg",
    //   ],
    // },
    // {
    //   uuid: "66a27291-4681-419d-aaeb-0f4ca05c3113",
    //   menubar: "청순카리나",
    //   title: "세번째입니다.",
    //   photosumnail:
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685466587-pagelogo.jpeg",
    //   photo: [
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685466589-pagelogo.jpeg",
    //     "https://akarina.s3.ap-northeast-2.amazonaws.com/uploads/1706685466598-cat.jpg",
    //   ],
    // },
  ]); //전시바구니
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
    // console.log("여기는 바꾸는");
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/karina")
      .then((response) => response.json())
      .then((data) => setMyArray(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log("카리나 테스트입니다.");
  }, []); // 빈 종속성 배열로 마운트 시에만 실행

  return (
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
            path="/detail/:id"
            element={<DetailPage myArray={myArray} />}
          />
        </Routes>

        <SeachBar />
        <Number />
        <Cute />
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
