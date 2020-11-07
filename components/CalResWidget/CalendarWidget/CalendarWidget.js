import React from "react";
import styles from "./style.module.scss";

import {
  SESSION_NAMES,
  SESSION_DURATIONS,
  getSesDurationText
} from "../../../utils/sessions";

const getTvText = tv => {
  return `${tv ? tv : "doplníme..."}`;
};

function CalendarWidget({ data }) {
  return (
    <table className={styles.table}>
      <caption className={styles.venueBlock}>
        <span className={styles.venueTitle}>VC {data.venue_name}</span>
        <span className={styles.venueDate}>{data.venue_date}</span>
      </caption>
      <tbody>
        <tr className={styles.header}>
          <th className={styles.event}>
            <span>Časť</span>
          </th>
          <th className={styles.time}>
            <span>Čas</span>
          </th>
          <th className={styles.tv}>
            <span>Vysiela</span>
          </th>
        </tr>
        {data.fp1_time ? (
          <tr className={styles.noBorder}>
            <td className={styles.event}>{SESSION_NAMES.FP1}</td>
            <td className={styles.time}>
              {getSesDurationText(data.fp1_time, SESSION_DURATIONS.FP1)}
            </td>
            <td className={styles.tv}>{getTvText(data.fp1_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.fp2_time ? (
          <tr>
            <td className={styles.event}>{SESSION_NAMES.FP2}</td>
            <td className={styles.time}>
              {getSesDurationText(data.fp2_time, SESSION_DURATIONS.FP2)}
            </td>
            <td className={styles.tv}>{getTvText(data.fp2_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.fp3_time ? (
          <tr>
            <td className={styles.event}>{SESSION_NAMES.FP3}</td>
            <td className={styles.time}>
              {getSesDurationText(data.fp3_time, SESSION_DURATIONS.FP3)}
            </td>
            <td className={styles.tv}>{getTvText(data.fp3_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.q_time ? (
          <tr>
            <td className={styles.event}>{SESSION_NAMES.Q}</td>
            <td className={styles.time}>
              {getSesDurationText(data.q_time, SESSION_DURATIONS.Q)}
            </td>
            <td className={styles.tv}>{getTvText(data.q_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.r_time ? (
          <tr>
            <td className={styles.event}>{SESSION_NAMES.R}</td>
            <td className={styles.time}>{data.r_time}</td>
            <td className={styles.tv}>{getTvText(data.r_tv)}</td>
          </tr>
        ) : (
          ""
        )}
      </tbody>
    </table>
  );
}

export default CalendarWidget;
