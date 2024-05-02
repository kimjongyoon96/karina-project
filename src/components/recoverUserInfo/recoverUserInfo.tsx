import React from "react";
import { useState } from "react";
import "./recover.css";
import { useNavigate } from "react-router-dom";

const RecoverUserInfo: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailForPw, setUserEmailForPw] = useState("");
  const navigate = useNavigate();

  const handleUserFindId = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recoverId`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            inputEmail: userEmail,
          }),
        }
      );
      const data = await response.json();
      console.log(data, "서버에서 보낸 값");
    } catch (error) {
      console.error(error, "아이디 찾기 로직 에러");
    }
  };

  const handleUserFindPw = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recoverPw`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            inputUserEmail: userEmailForPw,
            inputUserId: userId,
          }),
        }
      );
      const data = await response.json();
      console.log(data, "비밀번호 받은 내용");
      if ((data.sucess = true)) {
        navigate("/findUserPw");
      }
    } catch (error) {
      console.error(error, "pw찾기 로직이 이상합니다.");
    }
  };
  return (
    <main className="Recover-section">
      <h1>회원정보 찾기</h1>
      <div className="Recover-box">
        <section>
          <h2>아이디 찾기</h2>
          <form onSubmit={handleUserFindId}>
            <div className="input-group-recover-id">
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="가입했던 이메일을 입력하세요"
              />
              <button className="user-id-button" type="submit">
                아이디 찾기
              </button>
            </div>
          </form>
        </section>
        <section>
          <form onSubmit={handleUserFindPw}>
            <div className="input-group-recover-pw">
              <h2>비밀번호 찾기</h2>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
              <input
                type="email"
                value={userEmailForPw}
                onChange={(e) => setUserEmailForPw(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
              <button className="user-pw-button" type="submit">
                비밀번호 찾기
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default RecoverUserInfo;
