import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { karinaData } from "../../types/contentType";
import "./detailPage.css";

interface DetailProps {
  myArray: karinaData[];
}

const DetailComponent: React.FC<DetailProps> = ({ myArray }) => {
  const { uuid } = useParams<{ uuid: string }>();

  const itemId = uuid !== undefined ? uuid : null;

  // 문자열 id를 숫자로 변환하고, 해당하는 게시물을 찾습니다.
  const post = itemId !== null ? myArray.find((p) => p.uuid === itemId) : null;

  const [comments, setComments] = useState([]); // 서버에서 가져온 댓글 목록
  const [commentText, setCommentText] = useState(""); // 댓글 입력 상태
  const [commentLoading, setCommentLoading] = useState(false); // 로딩 상태 정의 (데이터)

  const fetchComments = async () => {
    setCommentLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/comments`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("댓글 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="detailPage">
      {post ? (
        <div>
          <h1>{post.title}</h1>
          {post.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index}`} />
          ))}
        </div>
      ) : (
        <p>게시물을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default DetailComponent;
