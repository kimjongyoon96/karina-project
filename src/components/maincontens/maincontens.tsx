import React, { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./maincontens.css";
import { MainContentsProps } from "./maincomponent";
import useAuthStore from "../../JustAnd/GlobalState";
import CompatiWithJangKaSuYoo from "./compatibilityToJangKaSulYoo/compatiWithJangKaSulYoo";
import RenderCompatibilityWithJksy from "./compatibilityToJangKaSulYoo/renderCompatibility/renderCompatibility";

const MainContents: React.FC<MainContentsProps> = () => {
  const navigate = useNavigate();
  //* 메뉴바 클릭시 변경되는 상태값 collabo JsutAnd로 받아옴.
  const { collaboClick } = useAuthStore((state) => state.isCollabo);
  const { collaboResult } = useAuthStore((state) => state.collaboResultData);
  const [isFirst, setIsFirst] = useState(false);
  const { mainContentsData } = useAuthStore(
    (state) => state.mainContentsGlobal
  );
  const { mainMountData, setMainMountData } = useAuthStore(
    (state) => state.mainMountRenderData
  );

  //* 바로 특정 메뉴바 메인페이지 마운트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/karina?menubar=jang&page=1`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMainMountData(data);
        setIsFirst(true);
        console.log("제출눌렀을때");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const goToSecondMain = (uuid: string): void => {
    navigate(`/detail/${uuid}`);
  };

  const itemsToRneders =
    isFirst && mainContentsData.length === 0 ? mainMountData : mainContentsData;
  // const itemsToRender =
  //   mainContentsData.length < data.length ? mainContentsData : data;
  console.log(itemsToRneders, "myarray가 data보다 작은경우 Myarray");
  const miniComponentRender = () => {
    if (collaboClick === "collabo" && !collaboResult) {
      return <CompatiWithJangKaSuYoo />;
    }
    if (collaboResult && collaboResult.includes("궁합은")) {
      return <RenderCompatibilityWithJksy />;
    }
    return null;
  };
  return (
    <main className="mainContents">
      {collaboClick !== "collabo" &&
        itemsToRneders.length > 0 &&
        itemsToRneders.slice(0, 16).map((item) => (
          <li
            key={item.uuid}
            className="content"
            onClick={() => goToSecondMain(item.uuid)}
          >
            <img className="mainThumbNail" src={item.photosumnail} />
            <h1>{item.title}</h1>
          </li>
        ))}
      {miniComponentRender()}
    </main>
  );
};

export default MainContents;
