import React from "react";
import { useState } from "react";
import "./signUp.css";
import { AuthContextType } from "../../types/contentType";
import { useNavigate } from "react-router-dom";
import { encrypt, decrypt } from "../../services/cryptoForState";
import googleBtn from "../../assets/photo/web_neutral_sq_ctn@1x.png";
const SignUp: React.FC = () => {
  const navigate = useNavigate();

  //* 구글 로그인s
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };
  //* 장카설유 회원가입
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
  const handleFindId = () => {
    navigate("/recoverUser");
  };
  const [userInputId, setUserInputId] = useState<string>("");
  const [userInputPw, setUserInputPw] = useState("");
  console.log(userInputId, userInputPw);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <h1 className="loginTitle">장카설유</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="userId">ID</label>
            <input
              id="userId"
              type="text"
              value={userInputId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInputId(e.target.value)
              }
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="userPw">PW</label>
            <input
              id="userPw"
              type="password"
              value={userInputPw}
              onChange={(e) => setUserInputPw(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="submit-btn">
            로그인하기
          </button>
        </form>
        <div className="login-buttons-container">
          <button
            className="google-login-btn"
            onClick={handleGoogleLogin}
            aria-label="Google 로그인"
          >
            <img height="50" src={googleBtn} alt="Google 로그인 버튼" />
          </button>
          <button
            className="naver-login-btn"
            onClick={handleNaverLogin}
            aria-label="Naver 로그인"
          >
            <img
              height="50"
              src="http://static.nid.naver.com/oauth/small_g_in.PNG"
              alt="Naver 로그인 버튼"
            />
          </button>
          <button className="nomal-login-btn" onClick={jangkasulyoo}>
            장카설유 회원가입 하기
          </button>
        </div>
        <div className="recovery-options">
          <button className="find-id-btn" onClick={handleFindId}>
            ID/PW 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
