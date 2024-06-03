"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ModalOverlay = styled_components_1.default.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.44;
`;
const ModalContent = styled_components_1.default.div `
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 300px;
  width: 50%;
  text-align: center;
`;
const ModalButton = styled_components_1.default.button `
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;
const WarningDeleteModal = ({ message, onConfirm, onCancel }) => {
    return (<ModalOverlay>
      <ModalOverlay>
        <ModalContent>
          <h2>경고!</h2>
          <p>{message}</p>
          <ModalButton onClick={onConfirm}>확인</ModalButton>
          <ModalButton onClick={onCancel}>취소</ModalButton>
        </ModalContent>
      </ModalOverlay>
    </ModalOverlay>);
};
exports.default = WarningDeleteModal;
//# sourceMappingURL=warningDelete.jsx.map