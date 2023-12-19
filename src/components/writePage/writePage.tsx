import React from "react";
import { useNavigate } from "react-router-dom";
import { karinaData } from "../../types/contentType";
// 상위 컴포넌트로 부터 받을 props 설정
interface MaintentsProps {
  addToArray: (obj: karinaData) => void;
}

// writePage 라는 함수형 컴포넌트 선언
const WritePage: React.FC<MaintentsProps> = ({ addToArray }) => {
  const navigate = useNavigate();

  return (
    <button
      className="test"
      onClick={() => {
        // addToArray();
        navigate("/");
      }}
    >
      등록
    </button>
  );
};

export default WritePage;

// 카리나데이터
