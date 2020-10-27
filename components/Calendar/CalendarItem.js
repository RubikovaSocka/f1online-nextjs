import React, { useState } from "react";
import styles from "./style.module.scss";
import { addMinutes, format, parse } from "date-fns";
import Media from "react-media";

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
      <Media query={{ maxWidth: 1023 }}>
        {matches =>
          matches ? (
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
          )
        }
      </Media>

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
              <span className={styles.session}>1. tréning</span>
              <span className={styles.sessionTime}>{`${fp1_time} - ${format(
                addMinutes(parse(fp1_time, "HH:mm", new Date()), 90),
                "HH:mm"
              )}`}</span>
              <span className={styles.sessionTv}>
                {fp1_tv ? fp1_tv : "Doplníme..."}
              </span>
            </div>
          ) : (
            ""
          )}

          {fp2_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>2. tréning</span>
              <span className={styles.sessionTime}>{`${fp2_time} - ${format(
                addMinutes(parse(fp2_time, "HH:mm", new Date()), 90),
                "HH:mm"
              )}`}</span>
              <span className={styles.sessionTv}>
                {fp2_tv ? fp2_tv : "Doplníme..."}
              </span>
            </div>
          ) : (
            ""
          )}
          {fp3_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>3. tréning</span>
              <span className={styles.sessionTime}>{`${fp3_time} - ${format(
                addMinutes(parse(fp3_time, "HH:mm", new Date()), 60),
                "HH:mm"
              )}`}</span>
              <span className={styles.sessionTv}>
                {fp3_tv ? fp3_tv : "Doplníme..."}
              </span>
            </div>
          ) : (
            ""
          )}
          {q_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>Kvalifikácia</span>
              <span className={styles.sessionTime}>{`${q_time} - ${format(
                addMinutes(parse(q_time, "HH:mm", new Date()), 60),
                "HH:mm"
              )}`}</span>
              <span className={styles.sessionTv}>
                {q_tv ? q_tv : "Doplníme..."}
              </span>
            </div>
          ) : (
            ""
          )}
          {r_time ? (
            <div className={styles.timesRow}>
              <span className={styles.session}>Preteky</span>
              <span className={styles.sessionTime}>{`${r_time}`}</span>
              <span className={styles.sessionTv}>
                {r_tv ? r_tv : "Doplníme..."}
              </span>
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
