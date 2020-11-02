import React from "react";
import styles from "./style.module.scss";

import { addMinutes, format, parse } from "date-fns";

const getTimeText = (time, minutes) => {
  return `${time} - ${format(
    addMinutes(parse(time, "HH:mm", new Date()), minutes),
    "HH:mm"
  )}`;
};

const getTvText = tv => {
  return tv ? tv : "doplníme...";
};

const SESSIONS = {
  FP1: "1. tréning",
  FP2: "2. tréning",
  FP3: "3. tréning",
  Q: "Kvalifikácia",
  R: "Preteky"
};

const SESSION_DUR = {
  FP1: 90,
  FP2: 90,
  FP3: 60,
  Q: 60
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
            <td className={styles.event}>{SESSIONS.FP1}</td>
            <td className={styles.time}>
              {getTimeText(data.fp1_time, SESSION_DUR.FP1)}
            </td>
            <td className={styles.tv}>{getTvText(data.fp1_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.fp2_time ? (
          <tr>
            <td className={styles.event}>{SESSIONS.FP2}</td>
            <td className={styles.time}>
              {getTimeText(data.fp2_time, SESSION_DUR.FP2)}
            </td>
            <td className={styles.tv}>{getTvText(data.fp2_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.fp3_time ? (
          <tr>
            <td className={styles.event}>{SESSIONS.FP3}</td>
            <td className={styles.time}>
              {getTimeText(data.fp3_time, SESSION_DUR.FP3)}
            </td>
            <td className={styles.tv}>{getTvText(data.fp3_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.q_time ? (
          <tr>
            <td className={styles.event}>{SESSIONS.Q}</td>
            <td className={styles.time}>
              {getTimeText(data.q_time, SESSION_DUR.Q)}
            </td>
            <td className={styles.tv}>{getTvText(data.q_tv)}</td>
          </tr>
        ) : (
          ""
        )}
        {data.r_time ? (
          <tr>
            <td className={styles.event}>{SESSIONS.R}</td>
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
