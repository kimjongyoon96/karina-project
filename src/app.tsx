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
  const { jwtExpiredThing, setJwtExpiredThing } = useAuthStore(
    (state) => state.jwtExpired
  );
  const { jwtDecodingData, setJwtDecodingData } = useAuthStore(
    (state) => state.jwtGlobal
  ); //* authStore JWT전역
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

  //* 장원영 메뉴바를 포함한 데이터를 가진 배열을 replaceArray의 매개변수에 할당
  //* replaceArray의 매개변수는 arrayToRest, 이것은 setMyArray의 상태
  //* 즉, 최종적으로 setMyArray에 장원영 데이터가 포함, 이것은 MyArray의 값이 장원영인 상태
  //* 최종적으로 myArray의 상태를 공유하는 메인컴포넌트에서 이값을 통해서 렌더링 한다.
  const replaceArray = (arrayToReset: any[]) => {
    setMyArray(arrayToReset);
    // console.log("이것은필시 메뉴바에 해당하는 data:", arrayToReset);
  };
  //* 1. 페이지가 마운트 되었을때 모든 게시물을 가져온다.
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

  //* 전역으로 관리할 JWT 인코딩 데이터 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/cookie`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.log("auth/cookie로 요청한 데이터 가져오는데 실패했습니다.");
        }
        const data = await response.json();
        setJwtDecodingData(data);

        console.log(data, "auth/cookie 요청한 req.cookie의 데이터입니다.");
      } catch (error) {
        console.error(error, "auth/cookie 클라이언트 try문 에러");
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Header />
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
                {/* <AuthManager /> */}
              </>
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
          <Route
            path="addNickName"
            element={<Nickname jwtToken={jwtToken} setJwtToken={setJwtToken} />}
          />
          <Route path="nonSocialLogin" element={<NonSocialLogin />} />
          <Route path="recoverUser" element={<RecoverUserInfo />} />
          <Route path="findUserPw" element={<FindUserPw />} />
          <Route
            path="myPage"
            element={<MyPage jwtToken={jwtToken} setJwtToken={setJwtToken} />}
          />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="userProfileUpdate" element={<UserProfileUpdate />} />
          <Route path="myInfoUpdate" element={<MyInfoUpdate />} />
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
