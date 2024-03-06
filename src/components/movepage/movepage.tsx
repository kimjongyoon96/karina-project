import React, { useEffect } from "react";
import "./movepage.css"; // CSS 파일 임포트
import { karinaData } from "../../types/contentType";
interface movementProps {
  replaceArray: (arrayToReset: any[]) => void;
  setCurrentPage: (currentPage: string) => void;
  currentMenubar: string;
  currentPage: string;
}
const Number: React.FC<movementProps> = ({
  replaceArray,
  setCurrentPage,
  currentMenubar,
  currentPage,
}) => {
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchData = fetch(
      `${process.env.REACT_APP_API_URL}/api/karina?menubar=${currentMenubar}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => replaceArray(data))
      .catch((error) => console.error("movement component error:", error));
  }, [currentPage]);

  return (
    <div className="number-container">
      <button className="page-button" onClick={() => handleCurrentPage("1")}>
        1
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("2")}>
        2
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("3")}>
        3
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("4")}>
        4
      </button>
      <button className="page-button" onClick={() => handleCurrentPage("5")}>
        5
      </button>
    </div>
  );
};

export default Number;
