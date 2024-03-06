import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { karinaData } from "../../types/contentType";
import { match } from "assert";
import "./searchRenderring.css";

interface searchProps {
  matchedItems: karinaData[]; // 상태 올려치기로 얻은 상태값(검색결과)
  myInputData: string;
}
const SearchRendering: React.FC<searchProps> = ({
  matchedItems,
  myInputData,
}) => {
  const navigate = useNavigate();
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
        `${process.env.REACT_APP_API_URL}/api/research?search=${myInputData}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`Http 에러났다. status ${response.status}`);
      }
      const data = await response.json();
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

  //* 데이터 요청 useEffect
  useEffect(() => {
    fetchItems(page);
  }, [page]);

  return (
    <main className="mainContents">
      {items.length > 0 &&
        items.slice(0, 12).map((item, index) => (
          <li
            key={item.uuid}
            className={`contents${index + 1}`}
            onClick={() => goToSecondMain(item.uuid)}
          >
            <img className="mainThumbNail" src={item.photosumnail} />
            <h1>{item.title}</h1>
          </li>
        ))}
    </main>
  );
};

export default SearchRendering;
