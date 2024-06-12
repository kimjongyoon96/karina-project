import React, { useState, useEffect } from "react";
import loadigjang from "../../../assets/photo/forLoadingModalImage/jangForLoading.jpeg";
import loadingKarina from "../../../assets/photo/forLoadingModalImage/loadingKarina.jpeg";
import loadingsulyoon from "../../../assets/photo/forLoadingModalImage/sulyoonForLoading.jpeg";
import loadingYuna from "../../../assets/photo/forLoadingModalImage/yunaForLoading.jpeg";
import "./loadingComponent.css";
const LoadingModalViewComponent: React.FC = () => {
  return (
    <div className="loading-container">
      <p>로딩중..</p>
      <div className="loading-spinner">
        <img src={loadigjang} alt="loading1" className="loading-image" />
        <img src={loadingKarina} alt="loading2" className="loading-image" />
        <img src={loadingYuna} alt="loading3" className="loading-image" />
        <img src={loadingsulyoon} alt="loading4" className="loading-image" />
      </div>
    </div>
  );
};

export default LoadingModalViewComponent;
