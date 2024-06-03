"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const jangForLoading_jpeg_1 = __importDefault(require("../../../assets/photo/forLoadingModalImage/jangForLoading.jpeg"));
const loadingKarina_jpeg_1 = __importDefault(require("../../../assets/photo/forLoadingModalImage/loadingKarina.jpeg"));
const sulyoonForLoading_jpeg_1 = __importDefault(require("../../../assets/photo/forLoadingModalImage/sulyoonForLoading.jpeg"));
const yunaForLoading_jpeg_1 = __importDefault(require("../../../assets/photo/forLoadingModalImage/yunaForLoading.jpeg"));
require("./loadingComponent.css");
const LoadingModalViewComponent = () => {
    return (<div className="loading-container">
      <p>로딩중..</p>
      <div className="loading-spinner">
        <img src={jangForLoading_jpeg_1.default} alt="loading1" className="loading-image"/>
        <img src={loadingKarina_jpeg_1.default} alt="loading2" className="loading-image"/>
        <img src={yunaForLoading_jpeg_1.default} alt="loading3" className="loading-image"/>
        <img src={sulyoonForLoading_jpeg_1.default} alt="loading4" className="loading-image"/>
      </div>
    </div>);
};
exports.default = LoadingModalViewComponent;
//# sourceMappingURL=loadindComponent.jsx.map