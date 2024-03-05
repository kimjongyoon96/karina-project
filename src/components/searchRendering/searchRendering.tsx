import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { karinaData } from "../../types/contentType";
import { match } from "assert";
import "./searchRenderring.css";

interface searchProps {
  matchedItems: karinaData[]; // 상태 올려치기로 얻은 상태값(검색결과)
}
const SearchRendering: React.FC<searchProps> = ({ matchedItems }) => {
  const navigate = useNavigate();

  const searchItems = matchedItems;
  const goToSecondMain = (uuid: string): void => {
    navigate(`/detail/${uuid}`);
  };
  //   console.log(matchedItems, "새로운 페이지에서 메치값 테스트"); => 정상적인 검색 배열 탄생, 아주 좋음
  return (
    <main className="mainContents">
      {searchItems.length > 0 &&
        searchItems.slice(0, 12).map((item, index) => (
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
