import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { karinaData, AuthContextType } from "../../types/contentType";
import "./detailPage.css";
import { type } from "os";

interface DetailProps extends AuthContextType {
  myArray: karinaData[];
}
type Comment = {
  username: string;
  text: string;
};
const DetailComponent: React.FC<DetailProps> = ({ myArray, jwtToken }) => {
  const { uuid } = useParams<{ uuid: string }>();

  const itemId = uuid !== undefined ? uuid : null;
  console.log(itemId);

  //* itemId가 null이 아니면 배열에서 uuid가 일치하는 것 찾음
  const post = itemId !== null ? myArray.find((p) => p.uuid === itemId) : null;
  console.log(post, "디테일페이지의 값인데 뭐가나올지 궁금하군..큭큭");

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  // console.log(userLiked, "ture인가 false인가?"); // 값이 있으니 true

  /**
   * @fetchAllCommentView => 상세페이지 마운트 되었을때 작동할 함수 모든 댓글을 보여줌.
   * @setCommentLoading =>로딩이 완료 유무 상태변경함수
   */
  const fetchAllCommentView = async () => {
    // setCommentLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/viewComments/${itemId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setComments(data);
    } catch (error) {
      console.error(error);
      console.log("댓글 불러오기 실패");
    }
  };
  // console.log(jwtToken?.["token"]);
  //* 댓글 제출시 실행될 함수
  const handleCommentSubmit = async (event) => {
    if (event != undefined) {
      event.preventDefault();
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/addcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken?.["token"]}`,
          },
          body: JSON.stringify({ text: commentText, postuuid: itemId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log(data, "댓글추가시 오는 데이터");

      setCommentText("");
      setComments((prevComments) => [
        ...prevComments,
        { username: data.userNickName, text: commentText },
      ]); //* prevComments는 현재 댓글 , ...prevCommnets는 현재댓글을 그대로 복사, 오른쪽 객체는 복사한 댓글에 추가하고 싶은 값
    } catch (error) {
      console.log(error);
      console.error("Error fetching data:", error);
    }
  };
  //* 추천을 눌렀을때 실행되는 함수
  const handleLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/like`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${jwtToken?.["token"]}`,
          },
          body: JSON.stringify({ postuuid: itemId }),
        }
      );
      if (response.ok) {
        setTotalLikes(totalLikes + 1);
      } else {
        // throw new Error("서버가 이상하다. 추천 로직을 검사하라");
      }
    } catch (error) {
      console.error("추천 에러가 발생했따리", "error");
    }
  };
  //* 마운트시 가져올 추천수 함수
  const fetchBringdLikes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/viewLikes/${itemId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken?.["token"]}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTotalLikes(data.totalLikes);
        setHasLiked(data.userLiked > 0);
      } else {
        throw new Error("문제가있다.");
      }
    } catch (error) {
      console.log("좋아요 불러오기 실패");
    }
  };
  //* detail 페이지 진입시 실행
  useEffect(() => {
    fetchAllCommentView();
    fetchBringdLikes();
  }, []);

  return (
    <div className="detailPage">
      {post ? (
        <div className="detailPageContents">
          <h1>{post.title}</h1>
          {post.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index}`} />
          ))}
        </div>
      ) : (
        <p>게시물을 찾을 수 없습니다.</p>
      )}
      <div className="commentBox">
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}:</strong> {comment.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentText} // 현재 텍스트값과 상태의 동기화
            onChange={(e) => setCommentText(e.target.value)} // 이벤트핸들러의.이벤트가 발생한 요소 즉 인풋 . 인풋필드의 현재값
            placeholder="댓글을 작성 하세요.."
          ></input>
          <button type="submit">제출</button>
        </form>
      </div>
      <div className="recommendationBox">
        <h3>추천수: {totalLikes}</h3>
        <button onClick={handleLike} disabled={hasLiked}>
          {hasLiked ? "추천됨" : "추천"}
        </button>
      </div>
    </div>
  );
};

export default DetailComponent;
