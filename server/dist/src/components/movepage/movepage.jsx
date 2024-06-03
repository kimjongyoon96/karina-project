"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./movepage.css"); // CSS 파일 임포트
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const Number = ({}) => {
    const handleCurrentPage = (page) => {
        setNumberData(page);
    };
    const { numberData, setNumberData } = (0, GlobalState_1.default)((state) => state.pagiNationMenubar);
    //* 메임 마운트가 null이면 누른거고, 아니면 초기화면이라고 인지
    //* mainMountData에서 menubar 추출, mainContentsData에서 menubar 추출
    //* 실질적으로, 현재 필요한 데이터는 현재의 메뉴바가 무엇인지 밖에 없다.
    //* 메인 컨텐츠에서, 실질적으로
    // useEffect(() => {
    //   const fetchData = fetch(
    //     `${process.env.REACT_APP_API_URL}/api/karina?menubar=${currentMenubar}&page=${currentPage}`
    //   )
    //     .then((response) => response.json())
    //     .then((data) => replaceArray(data))
    //     .catch((error) => console.error("movement component error:", error));
    // }, [currentPage]);
    // const menubar = !menubarData ? "jang" : menubarData;
    // console.log(menubar, "삼항연산자 사용해서 데이터 검증");
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch(
    //         `${process.env.REACT_APP_API_URL}/api/karina?menubar=${menubar}&page=${currentMenubar}`
    //       );
    //       const data = await response.json();
    //     } catch (error) {
    //       console.error(error, "페이지네이션 에러가 발생했습니다.");
    //     }
    //     fetchData();
    //   };
    // }, [currentMenubar]);
    return (<div className="number-container">
      <button className="page-button" onClick={() => handleCurrentPage("1")}>
        1
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("2")}>
        2
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("3")}>
        3
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("4")}>
        4
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("5")}>
        5
      </button>
    </div>);
};
exports.default = Number;
//# sourceMappingURL=movepage.jsx.map