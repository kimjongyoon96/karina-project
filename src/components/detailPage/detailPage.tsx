import React from "react";
import { useParams } from "react-router-dom";
import { karinaData } from "../../types/contentType"; // 경로는 실제 파일 위치에 따라 다를 수 있음

interface DetailProps {
  myArray: karinaData[]; // 전체 게시물 데이터
}

const DetailComponent: React.FC<DetailProps> = ({ myArray }) => {
  // useParams를 사용하여 URL에서 id 값을 추출합니다. id는 문자열 타입입니다.
  const { uuid } = useParams<{ uuid: string }>();

  console.log(uuid, "여기가 유유아이디입니다.");

  const itemId = uuid !== undefined ? uuid : null;

  // 문자열 id를 숫자로 변환하고, 해당하는 게시물을 찾습니다.
  const post = itemId !== null ? myArray.find((p) => p.uuid === itemId) : null;

  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          {post.photo &&
            post.photo.map((photo, index) => (
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
