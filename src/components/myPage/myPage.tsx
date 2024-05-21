import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, myWrite } from "../../types/contentType";
import "./myPage.css";
import WarningDeleteModal from "../customComponent/deleteModalForMyPage/warningDelete";
import { response } from "express";
interface users {
  id: number;
  title: string;
  content: string;
  userNickName: string;
  text: string;
  likeid: string;
  postid: number;
  creationdate: string;
  post: string;
  username: string;
  menubar: string;
  photosumnail: string;
  commentid: string;
}

interface BringData {
  posts?: users[];
  commnets?: users[];
  likes?: users[];
  total?: number;
}
const MyPage: React.FC<AuthContextType> = ({ jwtToken }) => {
  //* 내가 쓴글, 내가 쓴 댓글, 내가 좋아요 한 게시물
  //* 내 정보 수정 => 닉네임 수정
  const [bringData, setData] = useState<BringData | null>(null);
  const [bringCommnets, setBringComments] = useState<BringData | null>(null);
  const [bringWrites, setBringWrites] = useState<BringData | null>(null);
  const [bringLikes, setBringLikes] = useState<BringData | null>(null);
  const [pageNumber, setPageNumber] = useState("");
  const [userinfoData, setUserInfoData] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // default "닫힘"
  console.log(bringCommnets);
  console.log(bringWrites);
  console.log(bringLikes);
  console.table(bringLikes);
  //* 마이페이지 진입시 모든 데이터를
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_API_URL}/api/usersData`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken?.["token"]}`,
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("에러발생 비상상ㅇ태");
  //       }
  //       const data = await response.json();
  //       console.log(data, "서버에서 준 유저JWT 해독 정보");
  //     } catch (error) {
  //       console.error(error, "에러가 발생했습니다.");
  //     }
  //   };
  //   fetchData();
  // }, []);

  const navigate = useNavigate();
  //* 내정보 수정 누를시 컴포넌트 이동
  const handleNavigateMyInfo = () => {
    navigate("/UpdateProfile");
  };
  //* 내가쓴글 클릭했을때 나오는 함수
  const handleMyWriteArticle = () => {
    console.log("마이게시글");

    fetchData("myWrite", 1, 8);
    setActiveSection("myWriteUl");
  };
  //* 내가쓴 댓글 나오게 하는 함수
  const handleMyWriteComments = () => {
    fetchData("myComments", 1, 8);
    setActiveSection("myCommentsUl");
  };
  //* 내가 좋아요 누른 게시물
  const handleMyLikeArticle = () => {
    fetchData("myLikes", 1, 8);
    setActiveSection("myLikesUl");
  };
  //* 삭제 눌렀을때 실행되는 함수
  const handleDeleteType = async () => {
    setIsModalOpen(true);
  };
  const handleModalConfirm = async (deleteType, postid) => {
    await fetchDeleteData(deleteType, postid);
  };
  const handleModalCancle = () => {
    setIsModalOpen(false);
  };

  //* 클릭할때마다 바뀌는 data에 대한 useEffect 훅
  useEffect(() => {
    if (bringData?.commnets && bringData.commnets.length > 0) {
      setBringComments(bringData);
    } else if (bringData?.likes && bringData.likes.length > 0) {
      setBringLikes(bringData);
    } else {
      setBringWrites(bringData);
    }
  }, [bringData]); // 댓글, 게시글, 좋아요

  const fetchData = async (type, page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users?selected=${type}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken?.["token"]}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("나의 정보 데이터가 이상합니다.");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error, "나의 정보 로직에 문제가있습니다.");
    }
  };

  const fetchDeleteData = async (deleteType, postid) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/deleteMyPage?selected=${deleteType}&infoSelected=${postid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const result = await response.json();
      } else {
        console.error("삭제하는데 실패했습니다.");
      }
    } catch (error) {
      throw new Error("삭제로직에 문제가 있습니다.");
    }
  };
  //* 조건부 렌더링
  //*
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
          <div className="mypage-render-box-myWrite">
            {activeSection === "myWriteUl" && bringWrites
              ? bringWrites.posts?.slice(0, 8).map((post) => (
                  <div key={post.id}>
                    <h2>{post.title}</h2>
                    <h2>{post.menubar}</h2>

                    <img src={post.photosumnail} />
                    <button
                      className="delete-btn-myWrite"
                      onClick={() => handleDeleteType()}
                    >
                      삭제
                    </button>
                    {isModalOpen && (
                      <WarningDeleteModal
                        message="이 댓글을 삭제하겟습니까?"
                        onConfirm={() => handleModalConfirm("myWrite", post.id)}
                        onCancel={handleModalCancle}
                      />
                    )}
                  </div>
                ))
              : "어떠한 게시글도 없다."}
          </div>

          <div className="mypage-render-box-myComments">
            {activeSection === "myCommentsUl" &&
            bringCommnets?.commnets &&
            bringCommnets.commnets.length > 0
              ? bringCommnets.commnets.slice(0, 8).map((comment) => (
                  <div>
                    <h2>{comment.text}</h2>
                    <h2>{comment.userNickName}</h2>
                    <h3>{comment.commentid}</h3>
                    <button
                      className="delete-btn-myComments"
                      onClick={() => handleDeleteType()}
                    >
                      삭제
                    </button>
                    {isModalOpen && (
                      <WarningDeleteModal
                        message="이 댓글을 삭제하겟습니까?"
                        onConfirm={() =>
                          handleModalConfirm("myComments", comment.commentid)
                        }
                        onCancel={handleModalCancle}
                      />
                    )}
                  </div>
                ))
              : "어떠한 댓글도 없습니다."}
          </div>

          <div className="mypage-render-box-myLikes">
            {activeSection === "myLikesUl" &&
            bringLikes?.likes &&
            bringLikes.likes.length > 0
              ? bringLikes.likes.slice(0, 8).map((like) => (
                  <div key={like.likeid}>
                    <h2>{like.username}</h2>
                    <div>{like.postid}</div>
                    <div>{like.creationdate}</div>
                  </div>
                ))
              : "어떠한 좋아요도 안했다."}
          </div>
        </div>
      </section>
    </main>
  );
};
export default MyPage;
