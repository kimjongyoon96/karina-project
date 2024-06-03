"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
require("./nickNAme.css");
const react_router_dom_1 = require("react-router-dom");
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const Nickname = () => {
    const [nickName, setNickName] = (0, react_2.useState)("");
    const { jwtDecodingData, setJwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    console.log(jwtDecodingData, "닉네임 진입햇을때의 값입니다.");
    console.log();
    console.log(nickName, "닉네임 보낼것");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const inputNickName = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addNickName`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${jwtDecodingData?.["token"]}`,
                },
                body: JSON.stringify({ nickName: nickName }),
            });
            if (!response.ok) {
                // 요청이 실패했다면 에러를 던집니다.
                throw new Error("닉네임 제출에 실패했습니다.");
            }
            else {
                navigate("/");
            }
        }
        catch (error) {
            // 에러 처리 로직, 예: 사용자에게 에러 메시지 표시
            console.error(error.message);
        }
    };
    //* 타이핑 했을때 실행될 함수
    const handleChange = (event) => {
        setNickName(event.target.value);
    };
    return (<div className="nick-name-box">
      <h1>장카설유</h1>
      <h2>거의다왔습니다!</h2>
      <h2>닉네임을 설정해주세요!</h2>
      <input type="text" className="nick-name-input" value={nickName} onChange={handleChange}></input>

      <button className="nick-name-button" onClick={inputNickName}>
        제출
      </button>
    </div>);
};
exports.default = Nickname;
//# sourceMappingURL=nickName.jsx.map