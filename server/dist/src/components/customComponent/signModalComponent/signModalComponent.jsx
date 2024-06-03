"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GlobalState_1 = __importDefault(require("../../../JustAnd/GlobalState"));
require("./Alert.css");
const react_router_dom_1 = require("react-router-dom");
const Alert = () => {
    const { alertMessage, showAlert, hideAlert, confirmAction } = (0, GlobalState_1.default)((state) => state.alertState);
    const navigate = (0, react_router_dom_1.useNavigate)();
    if (!showAlert)
        return null;
    const gotoSecond = () => {
        navigate("signUp");
    };
    return (<div className="alert-overlay-modal">
      <div className="alert-box-modal">
        <p>{alertMessage}</p>
        <button onClick={hideAlert}>닫기</button>
        <button onClick={() => {
            if (confirmAction) {
                confirmAction();
                hideAlert();
            }
        }}>
          확인
        </button>
      </div>
    </div>);
};
exports.default = Alert;
//# sourceMappingURL=signModalComponent.jsx.map