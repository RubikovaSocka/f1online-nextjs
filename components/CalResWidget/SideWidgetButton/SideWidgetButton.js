import React from "react";

import styles from "./style.module.scss";

function SideWidgetButton({ selected, title, onClick }) {
  return (
    <div className={styles.ButtonContainer}>
      <div
        onClick={onClick}
        className={`${styles.WidgetButton} ${selected ? styles.selected : ""}`}
      >
        <span>{title}</span>
      </div>
      <div
        className={`${styles.ArrowUp} ${selected ? styles.selected : ""}`}
      ></div>
    </div>
  );
}

export default SideWidgetButton;
