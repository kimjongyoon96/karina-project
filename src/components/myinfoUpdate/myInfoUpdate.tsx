import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../JustAnd/GlobalState";

const MyInfoUpdate: React.FC = () => {
  const { jwtDecodingData } = useAuthStore((state) => state.jwtGlobal);
  const [userData, setUserData] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  //* jwtDecodingData?.["token"] => jwt 객체의 값만 추출
  useEffect(() => {
    if (jwtDecodingData) {
      console.log("마이페이지 수정에서의 JWT값", jwtDecodingData?.["token"]);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/usersInfo`,
            {
              method: "POST",
              headers: {
                authorization: `${jwtDecodingData?.["token"]}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json(); //* userInfo entity data
          console.log("내정보 수정 data:", data);
          setUserData(data); // 렌더링 위한 userinfo data 상태에 저장
        } catch (error) {
          console.error(error, "내정보 수정을 위한 업데이트 입니다.");
        }
      };
      fetchData();
    }
  }, [jwtDecodingData]);
  const handleUserInfo = () => {};

  const handleIsUpdateTrue = () => {};

  const handleIsUpdateFals = () => {};
  return (
    <main className="user-info-update-box">
      <h1>내 정보 수정하기</h1>
      <div className="social-user-update-box">
        <form onSubmit={handleUserInfo}>
          <div className="input-group">
            <input type="text" placeholder="유저이름 for 소셜로그인" />
            <button type="button">확인</button>
          </div>
          <div className="input-group">
            <input type="text" placeholder="유저아이디 for 논소셜" />
            <button type="button">확인</button>
          </div>
          <div className="input-group">
            <input type="email" placeholder="유저이메일" />
            <button type="button">확인</button>
          </div>
          <div className="input-group">
            <input type="text" placeholder="유저닉네임" />
            <button type="button">확인</button>
          </div>
          <div className="input-group">
            <input type="password" placeholder="유저비밀번호 for nonSocial" />
            <button type="button">확인</button>
          </div>
          <div className="input-group">
            <input type="password" placeholder="유저 비밀번호 확인" />
            <button type="button">확인</button>
          </div>
          <button type="submit" className="submit-btn">
            회원정보 수정하기
          </button>
        </form>
      </div>
    </main>
  );
};

export default MyInfoUpdate;
