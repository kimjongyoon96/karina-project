import React from "react";
import { useState } from "react";
import "./nickNAme.css";
const Nickname: React.FC = () => {
  const [nickdName, setNickName] = useState("");
  //* 버튼 클릭 했을 때 실행 될 함수
  const inputNickName = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/addNickName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickName: nickdName }),
        }
      );

      if (!response.ok) {
        // 요청이 실패했다면 에러를 던집니다.
        throw new Error("닉네임 제출에 실패했습니다.");
      }

      // 예: 성공 알림 표시, 페이지 리디렉션, 상태 업데이트 등
      console.log("닉네임이 성공적으로 제출되었습니다.");
    } catch (error) {
      // 에러 처리 로직, 예: 사용자에게 에러 메시지 표시
      console.error(error.message);
    }
  };

  //* 타이핑 했을때 실행될 함수
  const handleChange = (event) => {
    setNickName(event.target.value);
  };
  return (
    <div className="nick-name-box">
      <h1>장카설유</h1>
      <h2>거의다왔습니다!</h2>
      <h2>닉네임을 설정해주세요!</h2>
      <input
        type="text"
        className="nick-name-input"
        value={nickdName}
        onChange={handleChange}
      ></input>

      <button className="nick-name-button" onClick={inputNickName}>
        제출
      </button>
    </div>
  );
};

export default Nickname;
