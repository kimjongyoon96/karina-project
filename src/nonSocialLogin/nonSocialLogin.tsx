import React from "react";
import { useState } from "react";
import "./nonSocial.css";
import validUserId from "../services/service";
import validUserPw from "../services/vaildws";
import validUserEmail from "../services/validEmail";
import validUserNickName from "../services/validNick";
import { useNavigate } from "react-router-dom";
const NonSocialLogin: React.FC = () => {
  const [inputUserId, setInputUserId] = useState("");
  const [isValidUserId, setIsValidUserId] = useState<null | boolean>(null);
  const [isValidUserEmail, setIsValidUserEmail] = useState<null | boolean>(
    null
  );
  const [isValidUserNickName, setIsValidUserNickName] = useState<
    null | boolean
  >(null);
  const [isValidUserPw, setIsValidUserPw] = useState<null | boolean>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [inputUserPassword, setInputUserPassword] = useState("");
  const [repeatUserPassword, setRepeatUserPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const [inputUserEmail, setInputUserEmail] = useState("");
  const [inputUserNickName, setInputUserNickName] = useState("");
  const navigate = useNavigate();
  //* 유저 아이디 검증
  const handleVerifyUserId = () => {
    const isvalid = validUserId(inputUserId);
    if (isvalid) {
      setIsValidUserId(true);
      setValidationMessage("유효한 아이디입니다.");
    } else {
      setIsValidUserId(false);
      setValidationMessage("유효하지 않은 아이디입니다.");
    }
  };
  //* 비밀번호 검증
  const handleVerifyUserPassword = () => {
    const isvalidPw = validUserPw(inputUserPassword);
    if (isvalidPw) {
      setIsValidUserPw(true);
    } else {
      setIsValidUserPw(false);
    }
  };
  //* 비밀번호 같은지 검증
  const handleVerifyPassWordPass = () => {
    setDoPasswordsMatch(repeatUserPassword === inputUserPassword);
  };
  //* 유저 이메일 검증
  const handleVerifyUserEmail = () => {
    const isvalidEmail = validUserEmail(inputUserEmail);
    if (isvalidEmail) {
      setIsValidUserEmail(true);
    } else {
      setIsValidUserEmail(false);
    }
  };
  //* 유저 닉네임 검증
  const handleVerifyUserNickName = () => {
    const isvalidNickName = validUserNickName(inputUserNickName);
    if (isvalidNickName) {
      setIsValidUserNickName(true);
    } else {
      setIsValidUserNickName(false);
    }
  };
  //* 인풋 값을 모두 보내는 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validUserEmail(inputUserEmail) &&
      validUserId(inputUserId) &&
      validUserPw(inputUserPassword) &&
      validUserNickName(inputUserNickName)
    ) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/userRegister`,
          {
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
          }
        );
        if (!response.ok) {
          throw new Error("회원가입 클라이언트 로직에 문제가 있습니다.");
        }
        const data = await response.json();
        console.log(data, "서버로부터 받은 회원가입 데이터");
        return navigate("/SignUp"); // 회원가입 완료시 메인화면으로 이동
      } catch (error) {
        console.error(error, "회원가입 로직에서 에러가 발생했습니다.");
      }
    } else {
      console.log("회원가입 인풋 태그 중에 유효하지 않은 것이 있습니다.");
    }
  };

  return (
    <div className="non-social-login-box">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
            placeholder="아이디"
          />

          <button type="button" onClick={handleVerifyUserId}>
            확인
          </button>
          {isValidUserId !== null && (
            <span
              style={{
                marginLeft: "8px",
                color: isValidUserId ? "green" : "red",
              }}
            >
              {validationMessage}
            </span>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            value={inputUserPassword}
            onChange={(e) => setInputUserPassword(e.target.value)}
            placeholder="최소하나의 특수문자 및 숫자필요"
          />
          <button type="button" onClick={handleVerifyUserPassword}>
            확인
          </button>
          {isValidUserPw === true ? (
            <span style={{ color: "green" }}>비밀번호가 유효합니다.</span>
          ) : null}
        </div>
        <div className="input-group">
          <input
            type="password"
            value={repeatUserPassword}
            onChange={(e) => setRepeatUserPassword(e.target.value)}
            placeholder="입력한 비밀번호 확인"
          />
          <button type="button" onClick={handleVerifyPassWordPass}>
            확인
          </button>
          {doPasswordsMatch ? (
            <span style={{ color: "green" }}>비밀번호가 일치합니다.</span>
          ) : null}
        </div>
        <div className="input-group">
          <input
            type="email"
            value={inputUserEmail}
            onChange={(e) => setInputUserEmail(e.target.value)}
            placeholder="이메일"
          />
          <button type="button" onClick={handleVerifyUserEmail}>
            확인
          </button>
          {isValidUserEmail === true ? (
            <span style={{ color: "green" }}>유효한 이메일입니다.</span>
          ) : null}
        </div>
        <div className="input-group">
          <input
            type="text"
            value={inputUserNickName}
            onChange={(e) => setInputUserNickName(e.target.value)}
            placeholder="닉네임 최대 6글자"
          />
          <button type="button" onClick={handleVerifyUserNickName}>
            확인
          </button>
          {isValidUserNickName === true ? (
            <span style={{ color: "green" }}>유효한 닉네임입니다.</span>
          ) : null}
        </div>
        <button type="submit" className="submit-btn">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default NonSocialLogin;
