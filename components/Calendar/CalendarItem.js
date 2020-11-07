import React, { useState } from "react";
import styles from "./style.module.scss";
import onMobile from "../../utils/onMobile";
import {
  SESSION_NAMES,
  SESSION_DURATIONS,
  getSesDurationText
} from "../../utils/sessions";

const getTvText = tv => {
  return `${tv ? tv : "doplníme..."}`;
};

function CalendarItem({
  venue_name,
  venue_date,
  fp1_time,
  fp2_time,
  fp3_time,
  q_time,
  r_time,
  fp1_tv,
  fp2_tv,
  fp3_tv,
  q_tv,
  r_tv,
  position,
  circuit_map,
  circuit_name
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      className={`${styles.container} ${
        isOpened ? styles.opened : styles.closed
      }`}
    >
      {onMobile() ? (
        <div
          className={`${styles.header} ${
            isOpened ? styles.opened : styles.closed
          }`}
          onClick={() => setIsOpened(prev => !prev)}
        >
          <div>
            <span className={styles.venueName}>{`${position +
              1}. VC ${venue_name}`}</span>
            <div className={styles.venueHeaderDate}>
              <span className={styles.date}>{venue_date}</span>
              <span className={styles.raceTime}>{r_time}</span>
            </div>
          </div>
          <i className={`fas fa-chevron-${isOpened ? "up" : "down"}`}></i>
        </div>
      ) : (
        <div
          className={`${styles.header} ${
            isOpened ? styles.opened : styles.closed
          }`}
          onClick={() => setIsOpened(prev => !prev)}
        >
          <i className={`fas fa-chevron-${isOpened ? "up" : "down"}`}></i>
          <span className={styles.venueName}>{`${position +
            1}. VC ${venue_name}`}</span>
          <div className={styles.venueHeaderDate}>
            <span className={styles.date}>
              {venue_date
                .split("-")[1]
                .trim()
                .replace(" 2020", "")}
            </span>
            <span className={styles.raceTime}>{r_time}</span>
          </div>
        </div>
      )}

      <div
        className={`${styles.contentBox} ${
          isOpened ? styles.opened : styles.closed
        }`}
      >
        <div className={styles.table}>
          <div className={`${styles.timesRow} ${styles.timesRowHeader}`}>
            <span className={styles.session}>Časť</span>
            <span className={styles.sessionTime}>Čas</span>
            <span className={styles.sessionTv}>Vysiela</span>
          </div>
          {fp1_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>{SESSION_NAMES.FP1}</span>
              <span className={styles.sessionTime}>
                {getSesDurationText(fp1_time, SESSION_DURATIONS.FP1)}
              </span>
              <span className={styles.sessionTv}>{getTvText(fp1_tv)}</span>
            </div>
          ) : (
            ""
          )}

          {fp2_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>{SESSION_NAMES.FP2}</span>
              <span className={styles.sessionTime}>
                {getSesDurationText(fp2_time, SESSION_DURATIONS.FP2)}
              </span>
              <span className={styles.sessionTv}>{getTvText(fp2_tv)}</span>
            </div>
          ) : (
            ""
          )}
          {fp3_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>{SESSION_NAMES.FP3}</span>
              <span className={styles.sessionTime}>
                {getSesDurationText(fp3_time, SESSION_DURATIONS.FP3)}
              </span>
              <span className={styles.sessionTv}>{getTvText(fp3_tv)}</span>
            </div>
          ) : (
            ""
          )}
          {q_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>{SESSION_NAMES.Q}</span>
              <span className={styles.sessionTime}>
                {getSesDurationText(q_time, SESSION_DURATIONS.Q)}
              </span>
              <span className={styles.sessionTv}>{getTvText(q_tv)}</span>
            </div>
          ) : (
            ""
          )}
          {r_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>{SESSION_NAMES.R}</span>
              <span className={styles.sessionTime}>{`${r_time}`}</span>
              <span className={styles.sessionTv}>{getTvText(r_tv)}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.circuitContainer}>
          <img src={circuit_map}></img>
          <span>{circuit_name}</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarItem;
