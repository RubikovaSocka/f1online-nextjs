import React, { Component } from "react";
import { useSelector } from "react-redux";
import { addMinutes, format, parse } from "date-fns";

import LinkAsButton from "../LinkAsButton/LinkAsButton";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";

import styles from "./style.module.scss";

function RenderCalendarItem({ event, time, tv }) {
  return (
    <div className={styles.timeDataItem}>
      <span className={styles.event}>{event}</span>
      <div className={styles.inRow}>
        <span className={styles.time}>{time}</span>
        <span className={styles.tvStations}>{tv}</span>
      </div>
    </div>
  );
}

function CalendarLarge() {
  const {
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
    circuit_image
  } = useSelector(({ programme }) => programme.event);

  return (
    <div>
      <SideSectionTitle title="Najbližšie preteky" />
      <div className={styles.container}>
        <img
          className={styles.image}
          alt={`Ilustračná foto k VC ${venue_name}`}
          src={`${circuit_image}`}
        />
        <div className={styles.dataContainer}>
          <div className={styles.venueTitleContainer}>
            <p className={styles.venueName}>VC {venue_name}</p>
            <p className={styles.date}>{venue_date}</p>
          </div>
          <div className={styles.cols}>
            <div className={styles.col1}>
              {fp1_time ? (
                <RenderCalendarItem
                  event="1. tréning"
                  time={`${fp1_time} - ${format(
                    addMinutes(parse(fp1_time, "HH:mm", new Date()), 90),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${fp1_tv ? " " + fp1_tv : ": doplníme..."}`}
                />
              ) : (
                ""
              )}
              {fp2_time ? (
                <RenderCalendarItem
                  event="2. tréning"
                  time={`${fp2_time} - ${format(
                    addMinutes(parse(fp2_time, "HH:mm", new Date()), 90),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${fp2_tv ? " " + fp2_tv : ": doplníme..."}`}
                />
              ) : (
                ""
              )}
              {fp3_time ? (
                <RenderCalendarItem
                  event="3. tréning"
                  time={`${fp3_time} - ${format(
                    addMinutes(parse(fp3_time, "HH:mm", new Date()), 60),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${fp3_tv ? " " + fp3_tv : ": doplníme..."}`}
                />
              ) : (
                ""
              )}
            </div>
            <div className={styles.col2}>
              {q_time ? (
                <RenderCalendarItem
                  event="Kvalifikácia"
                  time={`${q_time} - ${format(
                    addMinutes(parse(q_time, "HH:mm", new Date()), 60),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${q_tv ? " " + q_tv : ": doplníme..."}`}
                />
              ) : (
                ""
              )}
              {r_time ? (
                <RenderCalendarItem
                  event="Preteky"
                  time={`${r_time}`}
                  tv={`vysiela${r_tv ? " " + r_tv : ": doplníme..."}`}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <LinkAsButton target={"/kalendar"} title={"Celý kalendár"} />
        </div>
      </div>
    </div>
  );
}
export default CalendarLarge;
