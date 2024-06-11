import React, { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./updateprofile.css";
import { AuthContextType } from "../../types/contentType";
import useAuthStore from "../../JustAnd/GlobalState";
import validateEmail from "../../services/validEmail";
//* 마이프로필 수정하기 컴포넌트에 진입시, 반드시 회원이 소셜or논소셜인지 구분
//* 구분을 하기 위해서, DB의 user_info_data를 활용할 계획인데
//* verifyToken 을 생각해보자, 토큰검증은 해당 유저가 존재하는지를 파악 할 뿐이지, 그
const UpdateProfile: React.FC = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [sixNumber, setSixnumber] = useState("");
  const [verifySixNumber, setVerifySixNumber] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const { jwtDecodingData, setJwtDecodingData } = useAuthStore(
    (state) => state.jwtGlobal
  );
  const [isback, setIsBakc] = useState(false);
  const navigate = useNavigate();
  console.log(inputEmail);
  useEffect(() => {
    if (showVerification && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsBlocked(true);
    }
  }, [showVerification, timeLeft]);
  const handleEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);
  };
  //* 이메일 인증 눌렀을때 실행되는 함수
  const handleEmailSend = async (e) => {
    e.preventDefault();
    if (!validateEmail(inputEmail)) {
      alert("유효한 이메일 주소를 입력하세요.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/emailForAuth`,
        {
          method: "POST",

          headers: {
            Authorization: `${jwtDecodingData?.["token"]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInputEmail: inputEmail }),
        }
      );
      const data = await response.json();
      console.log(data, "입력해야 하는 값");
      if (!response.ok) {
        return console.error("뭔가 문제가있습니다");
      }
      setVerifySixNumber(data);
      setIsBlocked(false);
      setShowVerification(true);
      setTimeLeft(180);
    } catch (error) {
      console.error("이메일 인증 에러가 발생했습니다.", error);
    }
  };
  const handleNumber = (e) => {
    const value = e.target.value;
    setSixnumber(value);
  };
  const handleVerifyNumber = (e) => {
    e.preventDefault();
    const trimmedSixNumber = String(sixNumber).trim();
    const trimmedVerifySixNumber = String(verifySixNumber).trim();
    if (trimmedSixNumber === trimmedVerifySixNumber) {
      setIsBlocked(true);
      navigate("/myInfoUpdate");
      console.log("숫자가 일치합니다!");
    } else {
      console.log("숫자가 일치하지 않습니다!");
    }
  };
  const handleBack = () => {
    navigate("/myPage");
  };
  return (
    <main className="profile-update">
      <div className="profile-update__box">
        <div className="profile-back-button">
          <button onClick={handleBack}>뒤로가기</button>
        </div>
        <h1 className="profile-update__title">
          내정보 수정위해 가입했던 이메일을 입력하세요
        </h1>
        <div className="profile-update__section">
          <form className="profile-update__form" onSubmit={handleEmailSend}>
            <input
              className="profile-update__input"
              type="email"
              value={inputEmail}
              placeholder="이메일을 입력하세요"
              onChange={handleEmail}
            />
            <button className="profile-update__button" type="submit">
              이메일 인증
            </button>
          </form>
        </div>
        {showVerification && !isBlocked && (
          <div className="profile-update__section">
            <form
              className="profile-update__verification-form"
              onSubmit={handleVerifyNumber}
            >
              <input
                className="profile-update__verification-input"
                value={sixNumber}
                type="number"
                placeholder="이메일로 받은 인증번호를 입력하세요"
                onChange={handleNumber}
                disabled={isBlocked}
                maxLength={6}
              />
              <button
                className="profile-update__verification-button"
                type="submit"
              >
                {" "}
                제출
              </button>
            </form>
            <p className="profile-update__timer">
              남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
            </p>
          </div>
        )}
        {isBlocked && (
          <p className="profile-update__error">
            시간 초과로 입력이 차단되었습니다. 다시 시도해 주세요.
          </p>
        )}
      </div>
    </main>
  );
};

export default UpdateProfile;
