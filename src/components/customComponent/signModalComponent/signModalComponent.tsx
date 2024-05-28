import React from "react";
import useAuthStore from "../../../JustAnd/GlobalState";
import "./Alert.css";
import { useNavigate } from "react-router-dom";

const Alert: React.FC = () => {
  const { alertMessage, showAlert, hideAlert, confirmAction } = useAuthStore(
    (state) => state.alertState
  );
  const navigate = useNavigate();
  if (!showAlert) return null;
  const gotoSecond = () => {
    navigate("signUp");
  };
  return (
    <div className="alert-overlay-modal">
      <div className="alert-box-modal">
        <p>{alertMessage}</p>
        <button onClick={hideAlert}>닫기</button>
        <button
          onClick={() => {
            if (confirmAction) {
              confirmAction();
              hideAlert();
            }
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
