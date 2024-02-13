import React from "react";
import ReactDOM from "react-dom";
import "./styles/app.css"; // 전역 스타일 관
import App from "./app";
import { AuthProvider } from "./authContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
