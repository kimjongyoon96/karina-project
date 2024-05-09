import React from "react";
import ReactDOM from "react-dom";
import "./styles/app.css"; // 전역 스타일 관
import App from "./app";

//* 모든 컴포넌트의 부모
ReactDOM.render(<App />, document.getElementById("root"));
