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
const GlobalState_1 = __importDefault(require("../../../../JustAnd/GlobalState"));
const react_confetti_1 = __importDefault(require("react-confetti"));
require("./renderCompatibility.css");
const RenderCompatibilityWithJksy = () => {
    const { collaboResult } = (0, GlobalState_1.default)((state) => state.collaboResultData);
    const [images, setImages] = (0, react_1.useState)(null);
    const userinfo = collaboResult.split(" ");
    const userNamed = userinfo[1]; // 입력한 이름
    const targetName = userinfo[3]; // 장원영,카리나,설윤,유나(a,b,c,d)
    const compatibility = userinfo[5]; // 상극,별로안맞음,약간호감,천생연분(가,나,다,라)
    console.log(userNamed, targetName, compatibility);
    console.log(images, "이미지값");
    const [showConfetti, setShowConfetti] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 4000); // 5초 후에 폭죽 애니메이션을 멈춤
        return () => clearTimeout(timer);
    }, []);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sajuRenderImage?type=${compatibility}&targetName=${targetName}`);
                const data = await response.json();
                console.log(data, "서버에서 준 데이터입니다.");
                setImages(data);
            }
            catch (error) {
                console.error(error, "s3 이미지 불러오기 실패");
            }
        };
        fetchData();
    }, []);
    return (<main className="render-comatibility-box">
      <h1>궁합 결과</h1>
      <h2>
        {showConfetti && <react_confetti_1.default />}
        {userNamed}님과 {targetName}의 궁합은
        {compatibility}입니다.
      </h2>
      <div>
        {images && (<img src={`data:${images.contentType};base64,${images.data}`} alt="sajuRenderImage"/>)}
      </div>
    </main>);
};
exports.default = RenderCompatibilityWithJksy;
//# sourceMappingURL=renderCompatibility.jsx.map