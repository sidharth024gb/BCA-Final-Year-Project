import React, { useContext } from "react";
import "./AlertBox.css";
import logo from "../../Assets/trading.png";
import { AppContext } from "../../Context/AppContext.js";

function AlertBox() {
  const { showAlertBox, setShowAlertBox } = useContext(AppContext);
  return (
    <div
      className={`alert-box box gap-10 flex-col ${
        showAlertBox ? "alert-visible" : "alert-hidden"
      }`}
    >
      <div className="alert-box-title flex-start">
        <img src={logo} alt="Logo" className="website-logo" />
        <h2>
          <span className="accent-1">Trade</span>Connect:-
        </h2>
      </div>
      <div className="alert-message">
        <p id="alert-message"></p>
      </div>
      <div className="alert-button flex-end">
        <button className="btn-accent-2" onClick={() => setShowAlertBox(false)}>
          OK
        </button>
      </div>
    </div>
  );
}

export default AlertBox;
