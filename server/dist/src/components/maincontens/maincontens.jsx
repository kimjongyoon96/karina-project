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
const react_router_dom_1 = require("react-router-dom");
require("./maincontens.css");
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const compatiWithJangKaSulYoo_1 = __importDefault(require("./compatibilityToJangKaSulYoo/compatiWithJangKaSulYoo"));
const renderCompatibility_1 = __importDefault(require("./compatibilityToJangKaSulYoo/renderCompatibility/renderCompatibility"));
const react_router_dom_2 = require("react-router-dom");
const MainContents = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { collabo } = (0, react_router_dom_2.useParams)(); // 콜라보 파라미터 따로처리
    //* 메뉴바 클릭시 변경되는 상태값 collabo JsutAnd로 받아옴.
    const { collaboClick } = (0, GlobalState_1.default)((state) => state.isCollabo);
    const { collaboResult } = (0, GlobalState_1.default)((state) => state.collaboResultData);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isFirst, setIsFirst] = (0, react_1.useState)(false);
    const { mainContentsData, setMainContentsData } = (0, GlobalState_1.default)((state) => state.mainContentsGlobal);
    const { mainMountData, setMainMountData } = (0, GlobalState_1.default)((state) => state.mainMountRenderData);
    const { numberData } = (0, GlobalState_1.default)((state) => state.pagiNationMenubar);
    const { menubar } = (0, react_router_dom_2.useParams)();
    console.log(mainMountData, menubar, mainContentsData, numberData, "초기값 렌더링값");
    const pageNumber = !numberData ? 1 : numberData;
    //* useParmas로 받은 메뉴바를 가지고 쿼리스트링으로 사용
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/karina?menubar=${menubar}&page=${pageNumber}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data, "메뉴바 눌렀을때 변화하는 렌더링 데이터");
                setMainContentsData(data);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [menubar, pageNumber]);
    //* 초기에 장원영으로 고정된 렌더링 데이터
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/karina?menubar=jang&page=${pageNumber}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data, "메뉴바 눌렀을때 변화하는 렌더링 데이터");
                setMainMountData(data);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [pageNumber]);
    const goToSecondMain = (uuid) => {
        navigate(`/detail/${uuid}`);
    };
    //* 초기 렌더링 상태를 menubar가 undefined라 가정, 즉 아무것도 눌러지지 않았을때 초기데이터
    const itemsToRender = menubar === undefined ? mainMountData : mainContentsData;
    return (<main className="mainContents">
      {collabo ? (collaboResult ? (<renderCompatibility_1.default />) : (<compatiWithJangKaSulYoo_1.default />)) : (<>
          {itemsToRender.length > 0 ? (itemsToRender.slice(0, 16).map((item) => (<li key={item.uuid} className="content" onClick={() => goToSecondMain(item.uuid)}>
                <img className="mainThumbNail" src={item.photosumnail}/>
                <h1>제목: {item.title}</h1>
                <h2>글쓴이: {item.userNickName}</h2>
              </li>))) : (<div>아무런 데이터도 없습니다.</div>)}
        </>)}
    </main>);
};
//* collaboCick이 콜라보가 아닐때는 ture => 메뉴바 클릭이벤트, 눌러졌다면 minicomponents 렌더링
//
exports.default = MainContents;
//# sourceMappingURL=maincontens.jsx.map