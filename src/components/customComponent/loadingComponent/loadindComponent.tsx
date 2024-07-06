import React from "react";
import "./loadingComponent.css";

const LoadingComponent = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-content">
        <div className="spinner"></div>
        <p>로딩중입니다...</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
