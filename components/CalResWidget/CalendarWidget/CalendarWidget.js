import React from "react";
import styles from "./style.module.scss";

import { addMinutes, format, parse } from "date-fns";

function calendarHeaderRow() {
  return (
    <div className={`${styles.calendarRow} ${styles.header}`}>
      <span className={styles.event}>Časť</span>
      <span className={styles.time}>Čas</span>
      <span className={styles.tv}>Vysiela</span>
    </div>
  );
}

function CalendarRow(props) {
  return (
    <div
      className={`${styles.calendarRow} ${
        props.event === "1. tréning" ? styles.noBorder : ""
      }`}
    >
      <span className={styles.event}>{props.event}</span>
      <span className={styles.time}>{props.time}</span>
      <span className={styles.tv}>{props.tv ? props.tv : "doplníme..."}</span>
    </div>
  );
}

const SESSION_NAMES = {
  FP1: "1. tréning",
  FP2: "2. tréning",
  FP3: "3. tréning",
  Q: "Kvalifikácia",
  R: "Preteky"
};

function CalendarWidgetContent({ data }) {
  return (
    <div className={styles.content}>
      <div className={styles.venueBlock}>
        <p className={styles.venueTitle}>VC {data.acf.venue_name}</p>
        <p className={styles.venueDate}>{data.acf.venue_date}</p>
      </div>
      {calendarHeaderRow()}
      <CalendarRow
        event="1. tréning"
        time={`${data.acf.fp1_time} - ${format(
          addMinutes(parse(data.acf.fp1_time, "HH:mm", new Date()), 90),
          "HH:mm"
        )}`}
        tv={data.acf.fp1_tv}
      />
      <CalendarRow
        event="2. tréning"
        time={`${data.acf.fp2_time} - ${format(
          addMinutes(parse(data.acf.fp2_time, "HH:mm", new Date()), 90),
          "HH:mm"
        )}`}
        tv={data.acf.fp2_tv}
      />
      <CalendarRow
        event="3. tréning"
        time={`${data.acf.fp3_time} - ${format(
          addMinutes(parse(data.acf.fp3_time, "HH:mm", new Date()), 60),
          "HH:mm"
        )}`}
        tv={data.acf.fp3_tv}
      />
      <CalendarRow
        event="Kvalifikácia"
        time={`${data.acf.q_time} - ${format(
          addMinutes(parse(data.acf.q_time, "HH:mm", new Date()), 60),
          "HH:mm"
        )}`}
        tv={data.acf.q_tv}
      />
      <CalendarRow
        event="Preteky"
        time={`${data.acf.r_time}`}
        tv={data.acf.r_tv}
      />
    </div>
  );
}

export default CalendarWidgetContent;
