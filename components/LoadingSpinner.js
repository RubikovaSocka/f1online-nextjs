import React from "react";

const LoadingSpinner = ({ title, nomargin }) => (
  <div
    style={{
      width: "100%",
      marginTop: `${nomargin ? "0" : "15px"}`,
      display: "flex",
      justifyContent: "center",
      fontFamily: "HK Grotesk",
      fontWeight: "600",
      color: "var(--basic-text-color)"
    }}
  >
    <div>
      <i
        style={{ textAlign: "center" }}
        className="fas fa-circle-notch fa-spin"
      />
      &nbsp;&nbsp;{props.title === "none" ? "" : title ? title : "Načítavam..."}
    </div>
  </div>
);

export default LoadingSpinner;
