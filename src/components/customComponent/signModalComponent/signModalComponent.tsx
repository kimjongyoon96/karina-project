import React from "react";
import useAuthStore from "../../../JustAnd/GlobalState";
import "./Alert.css";

const Alert = () => {
  const { alertMessage, showAlert, hideAlert } = useAuthStore(
    (state) => state.alertState
  );

  if (!showAlert) return null;

  return (
    <div className="alert-overlay-modal">
      <div className="alert-box-modal">
        <p>{alertMessage}</p>
        <button onClick={hideAlert}>Close</button>
      </div>
    </div>
  );
};

export default Alert;
