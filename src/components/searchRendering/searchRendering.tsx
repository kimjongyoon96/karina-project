import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { karinaData } from "../../types/contentType";
import { match } from "assert";
import "./searchRenderring.css";
import useAuthStore from "../../JustAnd/GlobalState";

const SearchRendering: React.FC = () => {
  const navigate = useNavigate();
  const { researchInputData } = useAuthStore(
    (state) => state.researchInputGlobal
  );
  console.log(researchInputData, "렌더링 결과에서의 검색결과 전역");
  const limit = 8;
  const [items, setItems] = useState<karinaData[]>([]);
  const [page, setPage] = useState(1); // 페이지 번호 상태
  const goToSecondMain = (uuid: string): void => {
    navigate(`/detail/${uuid}`);
  };
  //* throttling 함수 테스트
  const throttle = (func: () => void, limit: number) => {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };
  //* 스크롤링 했을때 생겨야할 추가적인 데이터
  const fetchItems = async (page) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/research?search=${researchInputData}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`Http 에러났다. status ${response.status}`);
      }
      const data = await response.json();
      console.log(data, "검색결과니까 잘봐라잉");
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
      console.error("스크롤링 요청 에러", error);
    }
  };
  //* 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      setPage((prePage) => prePage + 1);
    return;
  };
  //* throttle 적용
  const throttledHandleScroll = throttle(handleScroll, 500);
  //* 스크롤 이벤트 useEffect
  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  //* 마운트 되었을때 실행되는 함수 즉 검색결과
  useEffect(() => {
    fetchItems(page);
  }, [page]);

  return (
    <main className="mainContents">
      <h2 className="renderData">{researchInputData}:검색결과입니다.</h2>
      {items.length > 0 &&
        items.slice(0, 12).map((item, index) => (
          <li
            key={item.uuid}
            className={`contents${index + 1}`}
            onClick={() => goToSecondMain(item.uuid)}
          >
            <img className="mainThumbNail" src={item.photosumnail} />
            <img className="profile-pic" src={item.s3Url} alt="profile"></img>
            <h1>제목:{item.title}</h1>
            <h2>글쓴이: {item.userNickName}</h2>
            <h4>댓글수:{item.commentCount}</h4>
            <h3>조회수:{item.postView}</h3>
            <h3>좋아요수:{item.likeCount ? item.likeCount : 0}</h3>
          </li>
        ))}
    </main>
  );
};

export default SearchRendering;
