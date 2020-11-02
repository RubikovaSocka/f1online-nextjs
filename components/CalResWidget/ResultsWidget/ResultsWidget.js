import React from "react";
import styles from "./style.module.scss";

const getBodyText = pts => {
  if (pts == 1) {
    return "1 bod";
  }
  if (pts > 1 && pts < 5) {
    return `${pts} body`;
  }
  return `${pts} bodov`;
};

function ResultsWidget({ data, title, dataTitle }) {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>{title}</caption>
      <tbody>
        <tr className={styles.header}>
          <th className={styles.position}>
            <span>Poz.</span>
          </th>
          <th className={styles.driver}>
            <span>Pilot</span>
          </th>
          <th className={styles.time}>
            <span>{dataTitle}</span>
          </th>
        </tr>
        {data.slice(1, 11).map(({ position, driverName, split, points }) => (
          <tr className={`${position === "1" ? styles.noBorder : ""}`}>
            <td className={styles.position}>
              <span>{position}.</span>
            </td>
            <td className={styles.driver}>
              <span>{driverName}</span>
            </td>
            <td className={styles.time}>
              <span>{split ? split : points ? getBodyText(points) : ""}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ResultsWidget;
