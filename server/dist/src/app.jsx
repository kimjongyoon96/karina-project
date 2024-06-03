"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/App.tsx
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const header_1 = __importDefault(require("./components/header/header")); // Header 컴포넌트 임포트
const menubar_1 = __importDefault(require("./components/menubar/menubar"));
const maincontens_1 = __importDefault(require("./components/maincontens/maincontens"));
const seachbar_1 = __importDefault(require("./components/seachbar/seachbar"));
const movepage_1 = __importDefault(require("./components/movepage/movepage"));
const detailPage_1 = __importDefault(require("./components/detailPage/detailPage"));
const writePage_1 = __importDefault(require("./components/writePage/writePage"));
const signUp_1 = __importDefault(require("./components/signUp/signUp"));
const searchRendering_1 = __importDefault(require("./components/searchRendering/searchRendering"));
const nickName_1 = __importDefault(require("./components/soical-nickName/nickName"));
const nonSocialLogin_1 = __importDefault(require("./components/nonSocialLogin/nonSocialLogin"));
const recoverUserInfo_1 = __importDefault(require("./components/recoverUserInfo/recoverUserInfo"));
const findUserPw_1 = __importDefault(require("./components/findUserPw/findUserPw"));
const myPage_1 = __importDefault(require("./components/myPage/myPage"));
const GlobalState_1 = __importDefault(require("./JustAnd/GlobalState"));
// import AuthManager from "./containers/container";
const updateProfile_1 = __importDefault(require("./components/updateProfile/updateProfile"));
const userProfileUpdate_1 = __importDefault(require("./components/userProfileUpdate/userProfileUpdate"));
const myInfoUpdate_1 = __importDefault(require("./components/myinfoUpdate/myInfoUpdate"));
const signModalComponent_1 = __importDefault(require("./components/customComponent/signModalComponent/signModalComponent"));
const immitationApp_1 = __importDefault(require("./components/immitationApp"));
const App = () => {
    const [currentPage, setCurrentPage] = (0, react_1.useState)("");
    console.log(currentPage, "클릭한페이지의값");
    const { jwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal); //* authStore JWT전역
    console.log(jwtDecodingData, "전역으로 설정한 값인데, 객체형태로 나와야하낟.");
    console.log("헤더에 들어가는 jwt:", jwtDecodingData?.["token"]);
    //* 서치바 컴포넌트 조건부 렌더링
    const ShowSeachbar = () => {
        const location = (0, react_router_dom_1.useLocation)();
        if (location.pathname !== "/write" &&
            !location.pathname.startsWith("/detail") &&
            !location.pathname.startsWith("/SignUp") &&
            !location.pathname.startsWith("/nonSocialLogin") &&
            !location.pathname.startsWith("/myPage") &&
            !location.pathname.startsWith("/UpdateProfile")) {
            return <seachbar_1.default />;
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
        const location = (0, react_router_dom_1.useLocation)();
        if (!location.pathname.startsWith("/nonSocialLogin") &&
            !location.pathname.startsWith("/detail") &&
            !location.pathname.startsWith("/SignUp") &&
            !location.pathname.startsWith("/myPage") &&
            !location.pathname.startsWith("/UpdateProfile") &&
            !location.pathname.startsWith("/write")) {
            return <movepage_1.default />;
        }
    };
    //* 장원영 메뉴바를 포함한 데이터를 가진 배열을 replaceArray의 매개변수에 할당
    //* replaceArray의 매개변수는 arrayToRest, 이것은 setMyArray의 상태
    //* 즉, 최종적으로 setMyArray에 장원영 데이터가 포함, 이것은 MyArray의 값이 장원영인 상태
    //* 최종적으로 myArray의 상태를 공유하는 메인컴포넌트에서 이값을 통해서 렌더링 한다.
    // const replaceArray = (arrayToReset: any[]) => {
    //   setMyArray(arrayToReset);
    // };
    return (<react_router_dom_1.BrowserRouter>
      <div>
        <immitationApp_1.default />
        <signModalComponent_1.default />
        <header_1.default />
        <menubar_1.default />
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<maincontens_1.default />}/>
          <react_router_dom_1.Route path="/menubar/:menubar" element={<maincontens_1.default />}/>
          <react_router_dom_1.Route path="collabo/:collabo" element={<maincontens_1.default />}/>
          <react_router_dom_1.Route path="/write" element={<writePage_1.default />}/>
          <react_router_dom_1.Route path="/searchRender" element={<searchRendering_1.default />}/>
          <react_router_dom_1.Route path="/detail/:uuid" element={<detailPage_1.default />}/>
          <react_router_dom_1.Route path="signUp" element={<signUp_1.default />}/>
          <react_router_dom_1.Route path="addNickName" element={<nickName_1.default />}/>
          <react_router_dom_1.Route path="nonSocialLogin" element={<nonSocialLogin_1.default />}/>
          <react_router_dom_1.Route path="recoverUser" element={<recoverUserInfo_1.default />}/>
          <react_router_dom_1.Route path="findUserPw" element={<findUserPw_1.default />}/>
          <react_router_dom_1.Route path="myPage" element={<myPage_1.default />}/>
          <react_router_dom_1.Route path="updateProfile" element={<updateProfile_1.default />}/>
          <react_router_dom_1.Route path="userProfileUpdate" element={<userProfileUpdate_1.default />}/>
          <react_router_dom_1.Route path="myInfoUpdate" element={<myInfoUpdate_1.default />}/>
        </react_router_dom_1.Routes>
        <ShowSeachbar />
        <ShowPagiNation />
      </div>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
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
//# sourceMappingURL=app.jsx.map