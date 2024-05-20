import React, { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./updateprofile.css";
import { AuthContextType } from "../../types/contentType";
//* 마이프로필 수정하기 컴포넌트에 진입시, 반드시 회원이 소셜or논소셜인지 구분
//* 구분을 하기 위해서, DB의 user_info_data를 활용할 계획인데
//* verifyToken 을 생각해보자, 토큰검증은 해당 유저가 존재하는지를 파악 할 뿐이지, 그
const UpdateProfile: React.FC<AuthContextType> = ({ jwtToken }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [sixNumber, setSixnumber] = useState("");
  const [verifySixNumber, setVerifySixNumber] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const navigate = useNavigate();
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

  const handleSendEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/emailForAuth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken?.["token"]}`,
            },
            body: JSON.stringify({
              inputEmail: inputEmail,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          return console.error(
            "Error:",
            "응답이 실패했습니다.",
            response.status
          );
        }
        setVerifySixNumber(data);
        setShowVerification(true);
        setTimeLeft(180);
        setIsBlocked(false);
      } catch (error) {
        console.error("에러가낫따", error);
      }
    };
    fetchData();
  };

  const handleVerifyEmailResult = (e) => {
    const value = e.target.value;
    setSixnumber(value);
    if (verifySixNumber === sixNumber) {
      navigate("/userProfileUpdate");
    } else {
      console.error("인증번호가 일치하지 않습니다.");
    }
  };
  return (
    <main className="update-my-profile-box">
      <div className="update-box">
        <h1>비밀번호를 입력하세요</h1>
        <input
          className="update-password-sector"
          type="email"
          value={inputEmail}
          placeholder="이메일을 입력하세요"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <button onClick={handleSendEmail}>입력</button>
        {showVerification && !isBlocked && (
          <div>
            <input
              value={sixNumber}
              type="text"
              placeholder="이메일로 받은 인증번호를 입력하세요"
              onChange={(e) => setSixnumber(e.target.value)}
              disabled={isBlocked}
            />
            <button onClick={handleVerifyEmailResult} disabled={isBlocked}>
              입력
            </button>
            <p>
              남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
            </p>
          </div>
        )}
        {isBlocked && (
          <p>시간 초과로 입력이 차단되었습니다. 다시 시도해 주세요.</p>
        )}
      </div>
    </main>
  );
};

export default UpdateProfile;
