"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const GlobalState_1 = __importDefault(require("../JustAnd/GlobalState"));
const FetchAndNavigate = () => {
    const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } = (0, GlobalState_1.default)((state) => state.alertState);
    const { jwtDecodingData, setJwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    console.log(jwtDecodingData, "모듈화한 useEffect 로직에서 전역으로 선언한 jwtDecond");
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/cookie`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    console.log("auth/cookie로 요청한 데이터 가져오는데 실패했습니다.");
                    return;
                }
                const data = await response.json();
                console.log(data, "cookie로 받아온 데이터");
                setJwtDecodingData(data);
                const tokenResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/jwtTokenExpired`, {
                    method: "POST",
                    headers: {
                        Authorization: `${data?.token}`,
                    },
                });
                if (tokenResponse.status === 401) {
                    const clearResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/clearCookie`, {
                        method: "POST",
                        credentials: "include",
                    });
                    if (clearResponse.status === 200) {
                        console.log("쿠키가 잘 지워졌습니다.");
                        setAllertMessage("토큰이 만료되었습니다. 다시 로그인 하시겠습니까?");
                        showAlertMessage();
                        setConfirmAction(() => {
                            hideAlert();
                            navigate("/signUp");
                        });
                    }
                }
            }
            catch (error) {
                console.log("에러가 발생했습니다", error);
            }
        };
        fetchData();
    }, [
        setAllertMessage,
        showAlertMessage,
        setConfirmAction,
        navigate,
        hideAlert,
    ]);
    return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};
exports.default = FetchAndNavigate;
//# sourceMappingURL=immitationApp.jsx.map