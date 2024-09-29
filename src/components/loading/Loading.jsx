import React from "react";
import "./style.css";
const Loading = (isPageLoading = false) => {
  return (
    <div
      className="flex"
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: isPageLoading ? "50vh" : "max-content",
      }}
    >
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
