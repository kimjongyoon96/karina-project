import React from "react";
import { useState, useEffect } from "react";
import "./nickNAme.css";
import { useAsyncValue, useNavigate } from "react-router-dom";
import useAuthStore from "../../JustAnd/GlobalState";
const Nickname: React.FC = () => {
  const [nickName, setNickName] = useState("");
  const { jwtDecodingData, setJwtDecodingData } = useAuthStore(
    (state) => state.jwtGlobal
  );
  console.log(jwtDecodingData, "닉네임 진입햇을때의 값입니다.");
  console.log();
  console.log(nickName, "닉네임 보낼것");
  const navigate = useNavigate();

  const inputNickName = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/addNickName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${jwtDecodingData?.["token"]}`,
          },
          body: JSON.stringify({ nickName: nickName }),
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
        value={nickName}
        onChange={handleChange}
      ></input>

      <button className="nick-name-button" onClick={inputNickName}>
        제출
      </button>
    </div>
  );
};

export default Nickname;
