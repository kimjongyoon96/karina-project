import React, { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./maincontens.css";
import { MainContentsProps } from "./maincomponent";
import useAuthStore from "../../JustAnd/GlobalState";
import CompatiWithJangKaSuYoo from "./compatibilityToJangKaSulYoo/compatiWithJangKaSulYoo";
import RenderCompatibilityWithJksy from "./compatibilityToJangKaSulYoo/renderCompatibility/renderCompatibility";

const MainContents: React.FC<MainContentsProps> = ({ myarray }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  //* 메뉴바 클릭시 변경되는 상태값 collabo JsutAnd로 받아옴.
  const { collaboClick } = useAuthStore((state) => state.isCollabo);
  const { collaboResult } = useAuthStore((state) => state.collaboResultData);
  console.log(collaboClick, collaboResult, "여기는 메인페이지 입니다.");
  console.log(collaboResult.includes("궁합")); // true 출력, 즉 궁합보기가 눌러짐
  console.log(myarray, "모든 게시물의 값");
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
        setData(data); // 로드된 데이터를 상태에 저장
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

  //* myarray는 최상위 컴포넌트에서 가져오는 모든 게시물의 값
  //* data는 특정 메뉴바의 page=1의 값
  //* 즉, myarray의 길이가 data의 길이보다 작다는것은, 게시물이 존재하지 않는다고 판단.
  const itemsToRender = myarray.length < data.length ? myarray : data;
  console.log(itemsToRender, "myarray가 data보다 작은경우 Myarray");
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
        itemsToRender.length > 0 &&
        itemsToRender.slice(0, 16).map((item) => (
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
