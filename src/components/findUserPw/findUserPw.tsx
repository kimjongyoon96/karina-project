import React from "react";
import { useState, useEffect } from "react";
import validUserPw from "../../services/vaildws";
import { useNavigate } from "react-router-dom";
const FindUserPw: React.FC = () => {
  const [sixCertification, setSixCertification] = useState(""); // 인증번호 인풋값 상태
  const [newPw, setNewPw] = useState(""); // 새 비번
  const [verifyNewPw, setVerifyNewPw] = useState(""); // 새 비번 확인
  const [leftTime, setLeftTime] = useState(180); // 타이머 초
  const [isActive, setIsActive] = useState(true); // 버튼 활성화 상태
  const [isVerified, setIsVerified] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let interval: any = null;

    if (isActive && leftTime > 0) {
      interval = setInterval(() => {
        setLeftTime(leftTime - 1);
      }, 1000);
    } else if (leftTime === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [leftTime, isActive]);

  const handleChange = (e) => {
    const value = e.target.value;
    // 숫자만 입력되고, 길이가 6자리를 넘지 않도록 검사
    if (value === "" || (value.length <= 6 && /^[0-9]*$/.test(value))) {
      setSixCertification(value);
    }
  };
  //* 인증번호 검증로직
  const handleCertifyNumber = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/certifyNumber`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            inputNumber: sixCertification,
          }),
        }
      );
      const data = await response.json();
      if (data.success === true) {
        setIsVerified(true); // => input 태그 나오게하기
      }
    } catch (error) {
      console.error(error, "인증번호 확인 에러");
    }
  };
  //* 새로운 비밀번호 유효성 검증
  const handleNewPwChange = (e) => {
    const pw = e.target.value;
    setNewPw(pw);
    setIsPwValid(validUserPw(pw)); // 비밀번호 유효성 검사
  };
  //* 비밀번호 확인
  const handleVerifyNewPwChange = (e) => {
    const pw = e.target.value;
    setVerifyNewPw(pw);
    setDoPasswordsMatch(newPw === pw); // 두 비밀번호가 일치하는지 확인
  };

  //* 비밀번호 http 통신
  const handleCertifyPw = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/changePw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernewPw: newPw,
          }),
        }
      );
      const data = await response.json();
      if (data.success === true) {
        navigate("/");
      }
    } catch (error) {
      console.error(error, "비밀번호 변경 클라이언트 로직 에러");
    }
  };
  return (
    <main className="find-user-pw-">
      <div className="find-user-pw-box">
        <h1 className="findUserPwTitle">비밀번호 다시 설정</h1>
        <form onSubmit={handleCertifyNumber}>
          <div className="input-group-certify-number">
            <input
              type="text"
              value={sixCertification}
              onChange={handleChange}
              placeholder="인증번호를 입력하세요"
              required
            />
            <button
              type="submit"
              className="submit-btnn"
              disabled={!isActive || isVerified}
            >
              숫자 인증하기
            </button>
          </div>
        </form>
        {isActive ? <p>남은 시간: {leftTime}초</p> : <p>시간 만료</p>}
        {isVerified && (
          <form onSubmit={handleCertifyPw}>
            <div className="input-group-new-pw">
              <input
                type="password"
                value={newPw}
                onChange={handleNewPwChange}
                placeholder="새 비밀번호 입력"
                required
              />
              {isPwValid ? (
                <span style={{ color: "green" }}>유효한 비밀번호입니다.</span>
              ) : null}
              <input
                type="password"
                value={verifyNewPw}
                onChange={handleVerifyNewPwChange}
                placeholder="새 비밀번호 확인"
                required
              />
              {doPasswordsMatch ? (
                <span style={{ color: "green" }}>비밀번호가 일치합니다.</span>
              ) : null}
              <button
                type="submit"
                disabled={!isPwValid || !doPasswordsMatch}
                className="submit-btnn"
              >
                비밀번호 변경
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default FindUserPw;
