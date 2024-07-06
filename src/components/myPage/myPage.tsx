import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, myWrite } from "../../types/contentType";
import "./myPage.css";
import WarningDeleteModal from "../customComponent/deleteModalForMyPage/warningDelete";
import useAuthStore from "../../JustAnd/GlobalState";
import { throttle } from "lodash";
import { UUID } from "sequelize";
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
  uuid: string;
  total: number;
}

interface BringData {
  posts?: users[];
  commnets?: users[];

  total?: number;
  likesWithPost?: users[];
  commentsWithPost?: users[];
}
const MyPage: React.FC<AuthContextType> = () => {
  //* 내가 쓴글, 내가 쓴 댓글, 내가 좋아요 한 게시물
  //* 내 정보 수정 => 닉네임 수정
  const [bringData, setData] = useState<BringData | null>(null);
  const [bringCommnets, setBringComments] = useState<BringData | null>(null);
  const [bringWrites, setBringWrites] = useState<BringData | null>(null);
  const [bringLikes, setBringLikes] = useState<BringData | null>(null);
  const [userinfoData, setUserInfoData] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // default "닫힘"
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { jwtDecodingData, setJwtDecodingData } = useAuthStore(
    (state) => state.jwtGlobal
  );
  const [paged, setPaged] = useState(1);

  console.log("마이페이지에서의 값", jwtDecodingData);
  console.log(bringData);
  console.log(paged, "실시간");
  useEffect(() => {
    const fetchData = async () => {
      if (jwtDecodingData) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/usersData`,
            {
              headers: {
                Authorization: `${jwtDecodingData?.["token"]}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("에러발생 비상상ㅇ태");
          }
          const data = await response.json();
          setUserInfoData(data.identifier);

          console.log(data, "서버에서 준 유저JWT 해독 정보");
        } catch (error) {
          console.error(error, "에러가 발생했습니다.");
        }
      }
    };
    fetchData();
  }, [jwtDecodingData]);
  const goToSecondMain = async (uuid: string): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/postView?postuuid=${uuid}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("조회수", data, uuid);
      if (response.ok) {
        navigate(`/detail/${uuid}`);
      } else {
        alert("에러발생");
      }
    } catch (error) {
      console.error("조회수 에러입니다.");
    }
  };
  const navigate = useNavigate();
  //* 내정보 수정 누를시 컴포넌트 이동
  const handleNavigateMyInfo = () => {
    navigate("/UpdateProfile");
  };

  useEffect(() => {
    if (triggerFetch) {
      fetchData("myLikes", paged, 8);
      setActiveSection("myLikesUl");
      setTriggerFetch(false);
    }
  }, [paged, triggerFetch]);
  //* 내가쓴글 클릭했을때 나오는 함수
  const handleMyWriteArticle = () => {
    console.log("마이게시글");

    fetchData("myWrite", paged, 8);
    setActiveSection("myWriteUl");
  };
  //* 내가쓴 댓글 나오게 하는 함수
  const handleMyWriteComments = () => {
    setPaged(1);
    fetchData("myComments", 1, 8);
    setActiveSection("myCommentsUl");
  };
  //* 내가 좋아요 누른 게시물
  const handleMyLikeArticle = () => {
    // fetchData("myLikes", paged, 8);
    // setActiveSection("myLikesUl");
    setPaged(1);
    setTriggerFetch(true);
  };
  //* 삭제 눌렀을때 실행되는 함수
  const handleDeleteType = async () => {
    setIsModalOpen(true);
  };
  //* 모달 출력 함수
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
    } else if (bringData?.likesWithPost && bringData.likesWithPost.length > 0) {
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
            Authorization: `${jwtDecodingData?.["token"]}`,
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
          headers: {
            Authorization: `${jwtDecodingData?.["token"]}`,
          },
        }
      );
      if (response.ok) {
        navigate("/myPage");
      } else {
        console.error("삭제하는데 실패했습니다.");
      }
    } catch (error) {
      throw new Error("삭제로직에 문제가 있습니다.");
    }
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      setPaged((prePage) => prePage + 1);
    return;
  };

  const throttledHandleScroll = throttle(handleScroll, 2000);
  //* 스크롤 이벤트 useEffect
  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  return (
    <main className="mypage-box">
      <div className="mypage-signature">
        <h1>my page 입니다.</h1>
      </div>
      <section className="mypage-header">
        <div className="mypage-client-nickName">
          <h2>안녕하세요 {userinfoData}님</h2>
        </div>
        <div className="mypage-navigation-myinfo">
          <p style={{ color: "red" }} onClick={handleNavigateMyInfo}>
            내정보 수정하기
          </p>
        </div>
      </section>
      <section className="mypage-select-uitag">
        <div className="mypage-container">
          <ul onClick={handleMyWriteArticle}>내가 쓴 게시물</ul>

          <ul onClick={handleMyWriteComments}>내가 쓴 댓글 </ul>
          <ul onClick={handleMyLikeArticle}>내가 좋아요 한 글</ul>
        </div>
      </section>

      <div className="mypage-render-box-myWrite">
        {activeSection === "myWriteUl"
          ? bringWrites
            ? bringWrites.posts?.slice(0, 8).map((post) => (
                <div className="post-container" key={post.id}>
                  <div className="post-header">
                    <h2>제목:{post.title}</h2>
                    <h2>카테고리:{post.menubar}</h2>
                  </div>
                  <div className="post-body">
                    <img
                      src={post.photosumnail}
                      onClick={() => goToSecondMain(post.uuid)}
                    />

                    <button
                      className="delete-btn-myWrite"
                      onClick={() => handleDeleteType()}
                    >
                      삭제
                    </button>
                  </div>
                  {isModalOpen && (
                    <WarningDeleteModal
                      message="이 게시물을 삭제하겟습니까?"
                      onConfirm={() => handleModalConfirm("myWrite", post.id)}
                      onCancel={handleModalCancle}
                    />
                  )}
                </div>
              ))
            : "어떠한 게시글도 없다."
          : null}
      </div>

      <div className="mypage-render-box-myComments">
        {activeSection === "myCommentsUl"
          ? bringCommnets?.commentsWithPost &&
            bringCommnets.commentsWithPost.length > 0
            ? bringCommnets.commentsWithPost.slice(0, 8).map((comment) => (
                <div className="mypage-myComments-wrap" key={comment.commentid}>
                  <div className="mypage-myComments-renderPost">
                    <h3 className="renderPost1">
                      게시물 제목:{comment.post?.["title"]}
                    </h3>
                    <h2 className="renderPost2">
                      작성자:{comment.userNickName}
                    </h2>

                    <img
                      className="renderPost3"
                      src={comment.post?.["photosumnail"]}
                      onClick={() => goToSecondMain(comment.post?.["uuid"])}
                    ></img>
                  </div>
                  <div className="mypage-myComments">
                    <h2>내가 쓴 댓글:{comment.text}</h2>
                    <button
                      className="delete-btn-myComments"
                      onClick={() => handleDeleteType()}
                    >
                      삭제
                    </button>
                    {isModalOpen && (
                      <WarningDeleteModal
                        message="이 댓글을 삭제하겠습니까?"
                        onConfirm={() =>
                          handleModalConfirm("myComments", comment.commentid)
                        }
                        onCancel={handleModalCancle}
                      />
                    )}
                  </div>
                </div>
              ))
            : "어떠한 댓글도 없습니다."
          : null}
      </div>

      <div className="mypage-render-box-myLikes">
        {activeSection === "myLikesUl"
          ? bringLikes?.likesWithPost && bringLikes.likesWithPost.length > 0
            ? bringLikes.likesWithPost.slice(0, 8).map((like) => (
                <div className="mypage-myLikes" key={like.likeid}>
                  <h3>제목:{like.post?.["title"]}</h3>
                  <h3>글쓴이:{like.post?.["userNickName"]}</h3>
                  <img
                    src={like.post?.["photosumnail"]}
                    onClick={() => goToSecondMain(like.post?.["uuid"])}
                  ></img>
                  <p>좋아요 한 시간:{like.creationdate}</p>
                </div>
              ))
            : "어떠한 좋아요도 안했다."
          : null}
      </div>
      <div className="mypage-pagination"></div>
    </main>
  );
};
export default MyPage;
