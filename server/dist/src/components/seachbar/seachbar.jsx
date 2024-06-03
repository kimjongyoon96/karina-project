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
const react_1 = __importStar(require("react"));
require("./seach.css");
const react_router_dom_1 = require("react-router-dom");
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const SeachBar = () => {
    const [tempInput, setTempInput] = (0, react_1.useState)(""); // 검색 결과 임시데이터
    const { jwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } = (0, GlobalState_1.default)((state) => state.alertState);
    const { researchInputData, setReserchInputData } = (0, GlobalState_1.default)((state) => state.researchInputGlobal);
    console.log(researchInputData, "검색전역상태");
    //* 글쓰기 컴포넌트로 이동 함수
    const navigate = (0, react_router_dom_1.useNavigate)();
    const goToSecondMain = () => {
        if (jwtDecodingData !== null) {
            navigate("/write");
        }
        else {
            setAllertMessage("로그인 하셔야 글쓰기가 가능합니다. 로그인 하시겠어요?");
            showAlertMessage();
            setConfirmAction(() => {
                hideAlert();
                navigate("/signUp");
            });
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    const goToSearchRendering = () => {
        navigate(`/searchRender`);
    };
    const handleChange = (e) => {
        setTempInput(e.target.value); // 사용자 입력을 임시 상태에 저장
    };
    const handleSearch = () => {
        setReserchInputData(tempInput);
        goToSearchRendering();
    };
    //* 검색결과 렌더링 Usenavigate
    return (<div className="searchwrap">
      <div className="lefttitle">검색</div>
      <input className="seachbox" value={tempInput} // input 태그의 value를 상태와 연결
     onChange={handleChange} // 입력 시 handleChange 함수 호출
     onKeyPress={handleKeyPress}></input>
      <button className="search-button" onClick={handleSearch}></button>

      <button className="write-button" onClick={goToSecondMain}>
        글쓰기
      </button>
    </div>);
};
exports.default = SeachBar;
//# sourceMappingURL=seachbar.jsx.map