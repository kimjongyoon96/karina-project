import React from "react";
import { useState, useEffect } from "react";
import "./nickNAme.css";
import { AuthContextType } from "../../types/contentType";
import { useAsyncValue, useNavigate } from "react-router-dom";
const Nickname: React.FC<AuthContextType> = ({ jwtToken }) => {
  const [nickdName, setNickName] = useState("");
  const navigate = useNavigate();
  //* 버튼 클릭 했을 때 실행 될 함수\ㅊ
  useEffect(() => {
    console.log(jwtToken, "닉네임에서의 JWt토큰의값입니다.");
  }, [jwtToken]); // jwtToken이 변경될 때만 실행
  const inputNickName = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/addNickName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken?.["token"]}`,
          },
          body: JSON.stringify({ nickName: nickdName }),
        }
      );

      if (!response.ok) {
        // 요청이 실패했다면 에러를 던집니다.
        throw new Error("닉네임 제출에 실패했습니다.");
      } else {
        navigate("/");
      }
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
