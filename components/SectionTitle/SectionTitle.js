import React from "react";
import styles from "./SectionTitle.module.scss";

function SectionTitle({ title }) {
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}

export default SectionTitle;
