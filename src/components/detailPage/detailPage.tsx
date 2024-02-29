import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { karinaData, AuthContextType } from "../../types/contentType";
import "./detailPage.css";

interface DetailProps extends AuthContextType {
  myArray: karinaData[];
}

const DetailComponent: React.FC<DetailProps> = ({ myArray, jwtToken }) => {
  const { uuid } = useParams<{ uuid: string }>();

  const itemId = uuid !== undefined ? uuid : null;

  // 문자열 id를 숫자로 변환하고, 해당하는 게시물을 찾습니다.
  const post = itemId !== null ? myArray.find((p) => p.uuid === itemId) : null;

  const [comments, setComments] = useState([""]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  /**
   * @fetchAllCommentView => 상세페이지 마운트 되었을때 작동할 함수 모든 댓글을 보여줌.
   * @setCommentLoading =>로딩이 완료 유무 상태변경함수
   */
  const fetchAllCommentView = async () => {
    setCommentLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.log("댓글 불러오기 실패");
    }
  };

  //* 제출시 실행될 함수
  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ text: commentText }), // `newComment` 대신 `commentText` 사용
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // 여기서 응답 데이터를 처리하거나, 새로운 댓글을 UI에 추가하는 로직을 구현할 수 있습니다.
      // 예: setComments(prevComments => [...prevComments, newCommentData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * @useEffect => 마운트 되었을때 @fetchComments 실행
   */
  useEffect(() => {
    fetchAllCommentView();
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
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 작성 하세요.."
          ></input>
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
};

export default DetailComponent;
