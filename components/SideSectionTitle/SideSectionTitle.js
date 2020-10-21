import React from "react";
import styles from "./style.module.scss";

function SideSectionTitle({ title }) {
  return <span className={styles.title}>{title}</span>;
}

export default SideSectionTitle;
