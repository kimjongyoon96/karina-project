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
// src/components/Header.tsx
const react_1 = __importStar(require("react"));
const pagelogo_png_1 = __importDefault(require("../../assets/photo/pagelogo.png"));
require("./header.css");
const react_router_dom_1 = require("react-router-dom");
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const Header = () => {
    const Navigate = (0, react_router_dom_1.useNavigate)();
    const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } = (0, GlobalState_1.default)((state) => state.alertState);
    const { jwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/clearCookie`, {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("로그아웃 시 토큰 없애버리기 실패");
            }
            const data = await response.json();
            console.log("로그아웃 눌렀을때 data:", data.status);
            // if (data.message === "쿠키가 잘 삭제되었습니다.") {
            //   setAllertMessage("정말 로그아웃 하시겠어요?");
            //   showAlertMessage();
            //   setConfirmAction(() => {
            //     Navigate("/");
            //   });
            // }
            console.log("로그아웃 성공: 쿠키가 삭제되었습니다.");
        }
        catch (error) {
            console.error("로그아웃 비동기 에러:", error);
        }
    };
    const gotoPage = () => {
        if (jwtDecodingData) {
            Navigate("/myPage");
        }
        else {
            setAllertMessage("로그인 하셔야 마이페이지 이동이 가능합니다. 로그인 하시겠어요?");
            showAlertMessage();
            setConfirmAction(() => {
                hideAlert();
                Navigate("/signUp");
            });
        }
    };
    return (<header className="header">
      {/* {isLoading && <LoadingModalViewComponent />}
        <button className="mypage-btn" onClick={handlebing}>
          리턴값 확인하기
        </button> */}
      <button className="myPage-btn" onClick={() => {
            gotoPage();
        }}>
        마이페이지
      </button>
      <img className="logo" onClick={() => {
            Navigate("/");
        }} src={pagelogo_png_1.default} alt="Page Logo"/>
      {!jwtDecodingData ? (<button className="loginButton" onClick={() => {
                console.log("login 버튼 누름");
                Navigate("SignUp");
            }}>
          로그인
        </button>) : (<button className="logoutButton" onClick={() => {
                setAllertMessage("정말 로그아웃 하시겠어요?");
                showAlertMessage();
                setConfirmAction(() => {
                    fetchData();
                    hideAlert();
                    Navigate("/signUp");
                });
            }}>
          로그아웃
        </button>)}
      <h1 className="title">장카설유</h1>
    </header>);
};
exports.default = Header;
// src/assets/photo/pagelogo.png
//# sourceMappingURL=header.jsx.map