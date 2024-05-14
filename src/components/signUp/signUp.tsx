import React from "react";
import { useState } from "react";
import "./signUp.css";
import { AuthContextType } from "../../types/contentType";
import { useNavigate } from "react-router-dom";
import { encrypt, decrypt } from "../../services/cryptoForState";
import navertag from "../../assets/photo/naver.png";
const SignUp = () => {
  const navigate = useNavigate();

  //* 구글 로그인
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };
  //* 장카설유 로그인
  const jangkasulyoo = () => {
    navigate("/nonSocialLogin");
  };
  //* 네이버 로그인
  const handleNaverLogin = () => {
    const clientId = `${process.env.NAVER_CLIENT_ID}`;
    const redirectURI = `${process.env.NAVER_CALLBACK_URL}`;
    const rawState = `${process.env.CSRF}`;
    const encryptedState = encrypt(rawState);
    const decryptedState = decrypt(encryptedState);
    if (decryptedState === rawState) {
      rawState;
    }

    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectURI
    )}&state=${rawState}`;
    window.location.href = naverLoginUrl;
  };
  const [userInputId, setUserInputId] = useState("");
  const [userInputPw, setUserInputPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loginCheck`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            inputId: userInputId,
            inputPw: userInputPw,
          }),
        }
      );
      if (!response.ok) {
        alert("회원정보가 없습니다.");
        throw new Error("로그인 try 문 안에 무엇인가 문제가 있습니다.");
      } else {
        const data = await response.json();
        console.log("로그인 로직에 에러가 없습니다.");
        console.log(data, "서버에서준 어떤 데이터");
      }
      navigate("/");
    } catch (error) {
      console.error(error, "로그인 핸들함수 에러");
    }
  };
  return (
    <div className="signup-container">
      <div className="login-box">
        <h1 className="loginTitle">Karina Gallery</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInputId}
            onChange={(e) => setUserInputId(e.target.value)}
            placeholder="아이디를 입력하세요"
          ></input>
          <input
            type="password"
            value={userInputPw}
            onChange={(e) => setUserInputPw(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          ></input>
          <button type="submit" className="submit-btn">
            로그인하기
          </button>
        </form>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          구글로 로그인하기
        </button>
        <button className="naver-login-btn" onClick={handleNaverLogin}>
          <img
            height="50"
            src="http://static.nid.naver.com/oauth/small_g_in.PNG"
          />
        </button>
        <button className="nomal-login-btn" onClick={jangkasulyoo}>
          장카설유 회원가입 하기
        </button>
        <div className="recovery-options">
          <button className="find-id-btn" onClick={handleGoogleLogin}>
            ID 찾기
          </button>
          <button className="find-pw-btn" onClick={handleSubmit}>
            PW 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
