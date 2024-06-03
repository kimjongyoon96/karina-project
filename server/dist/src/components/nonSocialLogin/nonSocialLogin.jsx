"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
require("./nonSocial.css");
const service_1 = __importDefault(require("../../services/service"));
const vaildws_1 = __importDefault(require("../../services/vaildws"));
const validEmail_1 = __importDefault(require("../../services/validEmail"));
const validNick_1 = __importDefault(require("../../services/validNick"));
const react_router_dom_1 = require("react-router-dom");
const NonSocialLogin = () => {
    const [inputUserId, setInputUserId] = (0, react_2.useState)("");
    const [isValidUserId, setIsValidUserId] = (0, react_2.useState)(null);
    const [isValidUserEmail, setIsValidUserEmail] = (0, react_2.useState)(null);
    const [isValidUserNickName, setIsValidUserNickName] = (0, react_2.useState)(null);
    const [isValidUserPw, setIsValidUserPw] = (0, react_2.useState)(null);
    const [validationMessage, setValidationMessage] = (0, react_2.useState)("");
    const [inputUserPassword, setInputUserPassword] = (0, react_2.useState)("");
    const [repeatUserPassword, setRepeatUserPassword] = (0, react_2.useState)("");
    const [doPasswordsMatch, setDoPasswordsMatch] = (0, react_2.useState)(false);
    const [inputUserEmail, setInputUserEmail] = (0, react_2.useState)("");
    const [inputUserNickName, setInputUserNickName] = (0, react_2.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    //* 함수 추상화 => 추후 Type 추가해서 리팩터링
    // const handleValidation = (
    //   validator,
    //   inputValue,
    //   setValidState,
    //   setValidationMessage
    // ) => {
    //   const isValid = validator(inputValue);
    //   setValidState(isValid);
    //   if (setValidationMessage) {
    //     setValidationMessage(
    //       isValid ? "유효한 입력입니다." : "유효하지 않은 입력입니다."
    //     );
    //   }
    // };
    //* 유저 아이디 검증
    const handleVerifyUserId = () => {
        const isvalid = (0, service_1.default)(inputUserId);
        if (isvalid) {
            setIsValidUserId(true);
            setValidationMessage("유효한 아이디입니다.");
        }
        else {
            setIsValidUserId(false);
            setValidationMessage("유효하지 않은 아이디입니다.");
        }
    };
    //* 비밀번호 검증
    const handleVerifyUserPassword = () => {
        const isvalidPw = (0, vaildws_1.default)(inputUserPassword);
        if (isvalidPw) {
            setIsValidUserPw(true);
        }
        else {
            setIsValidUserPw(false);
        }
    };
    //* 비밀번호 같은지 검증
    const handleVerifyPassWordPass = () => {
        setDoPasswordsMatch(repeatUserPassword === inputUserPassword);
    };
    //* 유저 이메일 검증
    const handleVerifyUserEmail = () => {
        const isvalidEmail = (0, validEmail_1.default)(inputUserEmail);
        if (isvalidEmail) {
            setIsValidUserEmail(true);
        }
        else {
            setIsValidUserEmail(false);
        }
    };
    //* 유저 닉네임 검증
    const handleVerifyUserNickName = () => {
        const isvalidNickName = (0, validNick_1.default)(inputUserNickName);
        if (isvalidNickName) {
            setIsValidUserNickName(true);
        }
        else {
            setIsValidUserNickName(false);
        }
    };
    //* 인풋 값을 모두 보내는 로직
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((0, validEmail_1.default)(inputUserEmail) &&
            (0, service_1.default)(inputUserId) &&
            (0, vaildws_1.default)(inputUserPassword) &&
            (0, validNick_1.default)(inputUserNickName)) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userRegister`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userid: inputUserId,
                        userpw: inputUserPassword,
                        useremail: inputUserEmail,
                        userNickName: inputUserNickName,
                    }),
                });
                if (response.status === 409) {
                    alert("이미 등록된 사용자입니다 로그인 해주세요"); //* 추후 로그인페이지로 이동시키는 모달 발생
                    throw new Error("이미 등록된 사용자 입니다.");
                }
                else if (response.status === 500) {
                    throw new Error("회원가입 도중 문제가 생겼습니다.");
                }
                else if (response.ok) {
                    const data = await response.json();
                    console.log(data, "서버로부터 받은 회원가입 데이터");
                    return navigate("/");
                }
                else {
                    throw new Error(`예상치 못한 상태 코드 ${response.status}`);
                }
            }
            catch (error) {
                console.error(error, "회원가입 로직에서 에러가 발생했습니다.");
            }
        }
        else {
            console.log("회원가입 인풋 태그 중에 유효하지 않은 것이 있습니다.");
        }
    };
    return (<div className="non-social-login-box">
      <h1>장카설유 회원가입 하기</h1>
      <form onSubmit={handleSubmit} className="non-social-form-box">
        <div className="input-group">
          <input type="text" value={inputUserId} onChange={(e) => setInputUserId(e.target.value)} placeholder="아이디"/>

          <button type="button" onClick={handleVerifyUserId}>
            확인
          </button>
          {isValidUserId !== null && (<span style={{
                marginLeft: "8px",
                color: isValidUserId ? "green" : "red",
            }}>
              {validationMessage}
            </span>)}
        </div>
        <div className="input-group">
          <input type="password" value={inputUserPassword} onChange={(e) => setInputUserPassword(e.target.value)} placeholder="최소하나의 특수문자 및 숫자필요"/>
          <button type="button" onClick={handleVerifyUserPassword}>
            확인
          </button>
          {isValidUserPw === true ? (<span style={{ color: "green" }}>비밀번호가 유효합니다.</span>) : null}
        </div>
        <div className="input-group">
          <input type="password" value={repeatUserPassword} onChange={(e) => setRepeatUserPassword(e.target.value)} placeholder="입력한 비밀번호 확인"/>
          <button type="button" onClick={handleVerifyPassWordPass}>
            확인
          </button>
          {doPasswordsMatch ? (<span style={{ color: "green" }}>비밀번호가 일치합니다.</span>) : null}
        </div>
        <div className="input-group">
          <input type="email" value={inputUserEmail} onChange={(e) => setInputUserEmail(e.target.value)} placeholder="이메일"/>
          <button type="button" onClick={handleVerifyUserEmail}>
            확인
          </button>
          {isValidUserEmail === true ? (<span style={{ color: "green" }}>유효한 이메일입니다.</span>) : null}
        </div>
        <div className="input-group">
          <input type="text" value={inputUserNickName} onChange={(e) => setInputUserNickName(e.target.value)} placeholder="닉네임 최대 6글자"/>
          <button type="button" onClick={handleVerifyUserNickName}>
            확인
          </button>
          {isValidUserNickName === true ? (<span style={{ color: "green" }}>유효한 닉네임입니다.</span>) : null}
        </div>
        <button type="submit" className="submit-btn">
          회원가입
        </button>
      </form>
    </div>);
};
exports.default = NonSocialLogin;
//# sourceMappingURL=nonSocialLogin.jsx.map