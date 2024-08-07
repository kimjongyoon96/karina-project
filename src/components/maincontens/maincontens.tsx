import React, { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./maincontens.css";
import { MainContentsProps } from "./maincomponent";
import useAuthStore from "../../JustAnd/GlobalState";
import CompatiWithJangKaSuYoo from "./compatibilityToJangKaSulYoo/compatiWithJangKaSulYoo";
import RenderCompatibilityWithJksy from "./compatibilityToJangKaSulYoo/renderCompatibility/renderCompatibility";
import { selectedPhoto } from "../../services/renderImage";
import { useParams } from "react-router-dom";
import LoadingComponent from "../customComponent/loadingComponent/loadindComponent";
const MainContents: React.FC = () => {
  const navigate = useNavigate();
  const { collabo } = useParams<{ collabo: string }>(); // 콜라보 파라미터 따로처리
  //* 메뉴바 클릭시 변경되는 상태값 collabo JsutAnd로 받아옴.
  const { collaboClick } = useAuthStore((state) => state.isCollabo);
  const { collaboResult } = useAuthStore((state) => state.collaboResultData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const { mainContentsData, setMainContentsData } = useAuthStore(
    (state) => state.mainContentsGlobal
  );
  const { mainMountData, setMainMountData } = useAuthStore(
    (state) => state.mainMountRenderData
  );
  const { numberData } = useAuthStore((state) => state.pagiNationMenubar);
  const { menubar } = useParams<{ menubar: string }>();
  console.log(
    mainMountData,
    menubar,
    mainContentsData,
    numberData,
    "초기값 렌더링값"
  );
  const pageNumber = !numberData ? 1 : numberData;
  //* useParmas로 받은 메뉴바를 가지고 쿼리스트링으로 사용
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/karina?menubar=${menubar}&page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, "메뉴바 눌렀을때 변화하는 렌더링 데이터");
        setMainContentsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [menubar, pageNumber]);
  //* 초기에 장원영으로 고정된 렌더링 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/karina?menubar=jang&page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setIsLoading(true);
        console.log(data, "메뉴바 눌렀을때 변화하는 렌더링 데이터");
        setMainMountData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pageNumber]);
  const goToSecondMain = async (uuid: string): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/postView?postuuid=${uuid}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("조회수", data);
      if (response.ok) {
        navigate(`/detail/${uuid}`);
      } else {
        alert("에러발생");
      }
    } catch (error) {
      console.error("조회수 에러입니다.");
    }
  };
  //* 초기 렌더링 상태를 menubar가 undefined라 가정, 즉 아무것도 눌러지지 않았을때 초기데이터
  const itemsToRender =
    menubar === undefined ? mainMountData : mainContentsData;
  console.log("렌더링할 데이터:", itemsToRender);
  return (
    <main className="mainContents">
      <LoadingComponent isLoading={isLoading} />
      {collabo ? (
        collaboResult ? (
          <RenderCompatibilityWithJksy />
        ) : (
          <CompatiWithJangKaSuYoo />
        )
      ) : (
        <>
          {itemsToRender.length > 0 ? (
            itemsToRender.slice(0, 16).map((item) => (
              <li
                key={item.uuid}
                className="content"
                onClick={() => goToSecondMain(item.uuid)}
              >
                <div className="mainThumNail">
                  <img src={item.photosumnail} />
                </div>
                <div className="details-container">
                  <div className="display-block">
                    <img
                      className="profile-pic"
                      src={item.s3Url}
                      alt="Profile"
                    />
                    <h4 className="main-writer"> {item.userNickName}</h4>
                  </div>
                  <h1>제목: {item.title}</h1>
                  <h4>댓글:{item.commentCount}</h4>
                  <h4>
                    좋아요수:
                    {item.likeCount ? item.likeCount : 0}
                  </h4>
                  <h4>조회수:{item.postView}</h4>
                </div>
              </li>
            ))
          ) : (
            <div>아무런 데이터도 없습니다.</div>
          )}
        </>
      )}
    </main>
  );
};
//* collaboCick이 콜라보가 아닐때는 ture => 메뉴바 클릭이벤트, 눌러졌다면 minicomponents 렌더링
//
export default MainContents;
