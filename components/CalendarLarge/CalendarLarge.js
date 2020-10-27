import React, { Component } from "react";
import { useSelector } from "react-redux";
import { addMinutes, format, parse } from "date-fns";

import LinkAsButton from "../LinkAsButton/LinkAsButton";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";

import styles from "./style.module.scss";

function RenderCalendarItem(props) {
  return (
    <div className={styles.timeDataItem}>
      <span className={styles.event}>{props.event}</span>
      <div className={styles.inRow}>
        <span className={styles.time}>{props.time}</span>
        <span className={styles.tvStations}>{props.tv}</span>
      </div>
    </div>
  );
}

function CalendarLarge() {
  const calendarData = useSelector(({ calendar }) => calendar.events[0]);

  return (
    <div>
      <SideSectionTitle title="Najbližšie preteky" />
      <div className={styles.container}>
        <img
          className={styles.image}
          alt={`Ilustračná foto k VC ${calendarData.venue_name}`}
          src={`${calendarData.circuit_image}`}
        />
        <div className={styles.dataContainer}>
          <div className={styles.venueTitleContainer}>
            <p className={styles.venueName}>VC {calendarData.venue_name}</p>
            <p className={styles.date}>{calendarData.venue_date}</p>
          </div>
          <div className={styles.cols}>
            <div className={styles.col1}>
              {calendarData.fp1_time ? (
                <RenderCalendarItem
                  event="1. tréning"
                  time={`${calendarData.fp1_time} - ${format(
                    addMinutes(
                      parse(calendarData.fp1_time, "HH:mm", new Date()),
                      90
                    ),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${
                    calendarData.fp1_tv
                      ? " " + calendarData.fp1_tv
                      : ": doplníme..."
                  }`}
                />
              ) : (
                ""
              )}
              {calendarData.fp2_time ? (
                <RenderCalendarItem
                  event="2. tréning"
                  time={`${calendarData.fp2_time} - ${format(
                    addMinutes(
                      parse(calendarData.fp2_time, "HH:mm", new Date()),
                      90
                    ),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${
                    calendarData.fp2_tv
                      ? " " + calendarData.fp2_tv
                      : ": doplníme..."
                  }`}
                />
              ) : (
                ""
              )}
              {calendarData.fp3_time ? (
                <RenderCalendarItem
                  event="3. tréning"
                  time={`${calendarData.fp3_time} - ${format(
                    addMinutes(
                      parse(calendarData.fp3_time, "HH:mm", new Date()),
                      60
                    ),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${
                    calendarData.fp3_tv
                      ? " " + calendarData.fp3_tv
                      : ": doplníme..."
                  }`}
                />
              ) : (
                ""
              )}
            </div>
            <div className={styles.col2}>
              {calendarData.q_time ? (
                <RenderCalendarItem
                  event="Kvalifikácia"
                  time={`${calendarData.q_time} - ${format(
                    addMinutes(
                      parse(calendarData.q_time, "HH:mm", new Date()),
                      60
                    ),
                    "HH:mm"
                  )}`}
                  tv={`vysiela${
                    calendarData.q_tv
                      ? " " + calendarData.q_tv
                      : ": doplníme..."
                  }`}
                />
              ) : (
                ""
              )}
              {calendarData.r_time ? (
                <RenderCalendarItem
                  event="Preteky"
                  time={`${calendarData.r_time}`}
                  tv={`vysiela${
                    calendarData.r_tv
                      ? " " + calendarData.r_tv
                      : ": doplníme..."
                  }`}
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
