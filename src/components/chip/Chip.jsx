import React, { useState } from "react";
import "./style.css";

const Chip = ({ label, isChecked, onClick }) => {
  return (
    <div className="chip" onClick={onClick}>
      <div className="chip-content">
        <span>{label}</span>
      </div>
      {isChecked && <div className="chip-toggle">✓</div>}
    </div>
  );
};

export default Chip;
