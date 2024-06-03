"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./styles/app.css"); // 전역 스타일 관리
const app_1 = __importDefault(require("./app"));
const root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_1.default.StrictMode>
    <app_1.default />
  </react_1.default.StrictMode>);
//# sourceMappingURL=index.jsx.map