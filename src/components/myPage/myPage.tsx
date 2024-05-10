import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../types/contentType";

const MyPage: React.FC<AuthContextType> = ({ jwtToken }) => {
  //* 내가 쓴글, 내가 쓴 댓글, 내가 좋아요 한 게시물
  //* 내 정보 수정 => 닉네임 수정
  const [data, setData] = useState([]);

  const [myCheckedData, setMyCheckedData] = useState("");
  const navigate = useNavigate();
  //* 내정보 수정 누를시 컴포넌트 이동
  const handleNavigateMyInfo = () => {
    navigate("/myInfoChange");
  };
  //* 내가쓴글 클릭했을때 나오는 함수
  //* 사진 | 제목 | 삭제
  const handleMyWriteArticle = () => {
    alert("여기는 마이게시글");
    setMyCheckedData("myWrite");
    fetchData("myWrite");
    try {
    } catch (error) {
      console.error(error, "에러가 발생했습니다.");
    }
  };
  //* 내가쓴 댓글 나오게 하는 함수
  //* 사진 | 댓글
  const handleMyWriteComments = () => {
    alert("여기는 마이댓글");
    fetchData("myComment");
    setMyCheckedData("myComment");
  };
  //* 내가 좋아요 누른 게시물
  //* 인스타 형식 정사각형 9개
  const handleMyLikeArticle = () => {
    alert("여기는 나의 좋아요");
    fetchData("myLikes");
    setMyCheckedData("myLikes");
  };

  //*
  const fetchData = async (type) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/myThings?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken?.["token"]}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = response.json();
      console.log(data, "서버에서 준거");
    } catch (error) {
      console.error(error, "에러가났다.");
    }
  };

  //* header 부분만 존재하게 나머지 컴포넌트 blocked
  return (
    <main className="mypage-box">
      <section className="mypage-header">
        <div className="mypage-signature">
          <p>my page</p>
        </div>
        <div className="mypage-navigation-myinfo">
          <p onClick={handleNavigateMyInfo}>내정보 수정하기</p>
        </div>
        <div className="mypage-client-photo"></div>
        <div className="mypage-client-nickName"></div>
      </section>
      <section className="mypage-select-uitag">
        <div className="mypage-container">
          <ul onClick={handleMyWriteArticle}>내가 쓴 게시물</ul>

          <ul onClick={handleMyWriteComments}>내가 쓴 댓글 </ul>
          <ul onClick={handleMyLikeArticle}>내가 좋아요 한 글</ul>
        </div>
      </section>
      <section className="mypage-selected-render">
        <div className="mypage-render-box">
          <div className="mypage-render-box-image" />
          안녕
          <div className="mypage-render-box-title" />
          하십
          <div className="mypage-render-box-delete-btn" />
          니까
        </div>
      </section>
    </main>
  );
};
export default MyPage;
