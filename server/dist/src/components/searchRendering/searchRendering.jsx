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
require("./searchRenderring.css");
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const SearchRendering = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { researchInputData } = (0, GlobalState_1.default)((state) => state.researchInputGlobal);
    console.log(researchInputData, "렌더링 결과에서의 검색결과 전역");
    const limit = 8;
    const [items, setItems] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1); // 페이지 번호 상태
    const goToSecondMain = (uuid) => {
        navigate(`/detail/${uuid}`);
    };
    //* throttling 함수 테스트
    const throttle = (func, limit) => {
        let inThrottle;
        return () => {
            if (!inThrottle) {
                func();
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    };
    //* 스크롤링 했을때 생겨야할 추가적인 데이터
    const fetchItems = async (page) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/research?search=${researchInputData}&page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`Http 에러났다. status ${response.status}`);
            }
            const data = await response.json();
            console.log(data, "검색결과니까 잘봐라잉");
            setItems((prevItems) => [...prevItems, ...data]);
        }
        catch (error) {
            console.error("스크롤링 요청 에러", error);
        }
    };
    //* 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight)
            setPage((prePage) => prePage + 1);
        return;
    };
    //* throttle 적용
    const throttledHandleScroll = throttle(handleScroll, 500);
    //* 스크롤 이벤트 useEffect
    (0, react_1.useEffect)(() => {
        window.addEventListener("scroll", throttledHandleScroll);
        return () => window.removeEventListener("scroll", throttledHandleScroll);
    }, []);
    //* 마운트 되었을때 실행되는 함수 즉 검색결과
    (0, react_1.useEffect)(() => {
        fetchItems(page);
    }, [page]);
    return (<main className="mainContents">
      {items.length > 0 &&
            items.slice(0, 12).map((item, index) => (<li key={item.uuid} className={`contents${index + 1}`} onClick={() => goToSecondMain(item.uuid)}>
            <img className="mainThumbNail" src={item.photosumnail}/>
            <h1>{item.title}</h1>
          </li>))}
    </main>);
};
exports.default = SearchRendering;
//# sourceMappingURL=searchRendering.jsx.map