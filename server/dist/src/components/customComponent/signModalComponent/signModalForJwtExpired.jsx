"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Modal = ({ message, onClose }) => {
    return (<div className="alram-Render-box" style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
        }}>
      <p>{message}</p>
      <button onClick={onClose}>닫기</button>
    </div>);
};
exports.default = Modal;
//# sourceMappingURL=signModalForJwtExpired.jsx.map