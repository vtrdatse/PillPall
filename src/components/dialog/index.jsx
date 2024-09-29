import React from "react";
import "./style.css";

const Dialog = ({ onClose, children }) => {
  return (
    <div
      className="dialog-container"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div className="dialog-frame">{children}</div>
    </div>
  );
};

export default Dialog;
