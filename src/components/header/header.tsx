// src/components/Header.tsx
import React, { useState } from "react";
import pageLogo from "../../assets/resource/pagelogo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../JustAnd/GlobalState";

const Header: React.FC = () => {
  const Navigate = useNavigate();
  const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } =
    useAuthStore((state) => state.alertState);
  const { jwtDecodingData } = useAuthStore((state) => state.jwtGlobal);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/clearCookie`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("로그아웃 시 토큰 없애버리기 실패");
      }
      const data = await response.json();
      console.log("로그아웃 눌렀을때 data:", data.status);
      // if (data.message === "쿠키가 잘 삭제되었습니다.") {
      //   setAllertMessage("정말 로그아웃 하시겠어요?");
      //   showAlertMessage();
      //   setConfirmAction(() => {
      //     Navigate("/");
      //   });
      // }
      console.log("로그아웃 성공: 쿠키가 삭제되었습니다.");
    } catch (error) {
      console.error("로그아웃 비동기 에러:", error);
    }
  };

  const gotoPage = () => {
    if (jwtDecodingData) {
      Navigate("/myPage");
    } else {
      setAllertMessage(
        "로그인 하셔야 마이페이지 이동이 가능합니다. 로그인 하시겠어요?"
      );
      showAlertMessage();
      setConfirmAction(() => {
        hideAlert();
        Navigate("/signUp");
      });
    }
  };
  return (
    <header className="header">
      {/* {isLoading && <LoadingModalViewComponent />}
      <button className="mypage-btn" onClick={handlebing}>
        리턴값 확인하기
      </button> */}
      <button
        className="myPage-btn"
        onClick={() => {
          gotoPage();
        }}
      >
        마이페이지
      </button>
      <img
        className="logo"
        onClick={() => {
          Navigate("/");
        }}
        src={pageLogo}
        alt="Page Logo"
      />
      {!jwtDecodingData ? (
        <button
          className="loginButton"
          onClick={() => {
            console.log("login 버튼 누름");
            Navigate("SignUp");
          }}
        >
          로그인
        </button>
      ) : (
        <button
          className="logoutButton"
          onClick={() => {
            setAllertMessage("정말 로그아웃 하시겠어요?");
            showAlertMessage();
            setConfirmAction(() => {
              fetchData();
              hideAlert();
              Navigate("/signUp");
            });
          }}
        >
          로그아웃
        </button>
      )}
      <h1 className="title">장카설유</h1>
    </header>
  );
};

export default Header;
// src/assets/photo/pagelogo.png
