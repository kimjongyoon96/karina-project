import React, { useState, useEffect } from "react";
import useAuthStore from "../../../../JustAnd/GlobalState";
import Confetti from "react-confetti";
import "./renderCompatibility.css";
//* 렌더링할 사주팔자의 결과값은 모두 전역상태로 가져온다.
//* 문자열 을 쪼개서, 그 값을 바인딩하고, 그 값에 해당하는 gif를 C에 맞게 렌더링한다.
//* 이를 위해서, useEffect를 사용해서 gif를 s3버킷에 있는 URL꾸러미를 가져온다.

const RenderCompatibilityWithJksy: React.FC = () => {
  const { collaboResult } = useAuthStore((state) => state.collaboResultData);
  const [images, setImages] = useState([]);
  const userinfo = collaboResult.split(" ");
  const userNamed = userinfo[1]; // 입력한 이름
  const targetName = userinfo[3]; // 장원영,카리나,설윤,유나(a,b,c,d)
  const compatibility = userinfo[5]; // 상극,별로안맞음,약간호감,천생연분(가,나,다,라)
  console.log(userNamed, targetName, compatibility);
  console.log(images, "이미지값");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000); // 5초 후에 폭죽 애니메이션을 멈춤

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/sajuRenderImage?type=${compatibility}&targetName=${targetName}`
        );
        const data = await response.json();
        console.log(data, "서버에서 준 데이터입니다.");

        setImages(data);
      } catch (error) {
        console.error(error, "s3 이미지 불러오기 실패");
      }
    };
    fetchData();
  }, []);
  const fileImage = images[0];
  return (
    <main className="render-comatibility-box">
      <h1>궁합 결과</h1>
      <h2>
        {showConfetti && <Confetti />}
        {userNamed}님과 {targetName}의 궁합은
        {compatibility}입니다.
      </h2>
      <div>{images && <img src={fileImage} alt="sajuRenderImage" />}</div>
    </main>
  );
};

export default RenderCompatibilityWithJksy;
