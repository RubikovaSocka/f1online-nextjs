import React, { useState } from "react";
import onMobile from "../../utils/onMobile";
import {
  SESSION_NAMES,
  SESSION_DURATIONS,
  getSesDurationText,
} from "../../utils/sessions";
import { Chevron, Container } from "./Containers";

const getTvText = (tv) => {
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
  circuit_name,
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Container className={`${isOpened ? "opened" : "closed"}`}>
      {onMobile() ? (
        <div
          className={`header ${isOpened ? "opened" : "closed"}`}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <div>
            <span className="venueName">{`${
              position + 1
            }. VC ${venue_name}`}</span>
            <div className="venueHeaderDate">
              <span className="date">{venue_date}</span>
              <span className="raceTime">{r_time}</span>
            </div>
          </div>
          <i className={`fas fa-chevron-${isOpened ? "up" : "down"}`}></i>
        </div>
      ) : (
        <div
          className={`header ${isOpened ? "opened" : "closed"}`}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <Chevron isOpened={isOpened} />
          <span className="venueName">{`${
            position + 1
          }. VC ${venue_name}`}</span>
          <div className="venueHeaderDate">
            <span className="date">
              {venue_date.split("-")[1].trim().replace(" 2020", "")}
            </span>
            <span className="raceTime">{r_time}</span>
          </div>
        </div>
      )}

      <div className={`contentBox ${isOpened ? "opened" : "closed"}`}>
        <div className="table">
          <div className="timesRow timesRowHeader">
            <span className="session">Časť</span>
            <span className="sessionTime">Čas</span>
            <span className="sessionTV">Vysiela</span>
          </div>
          {fp1_time ? (
            <div className="timesRow">
              <span className="session">{SESSION_NAMES.FP1}</span>
              <span className="sessionTime">
                {getSesDurationText(fp1_time, SESSION_DURATIONS.FP1)}
              </span>
              <span className="sessionTV">{getTvText(fp1_tv)}</span>
            </div>
          ) : (
            ""
          )}

          {fp2_time ? (
            <div className="timesRow">
              <span className="session">
                {venue_name === "Veľkej Británie"
                  ? "Kvalifikácia"
                  : SESSION_NAMES.FP2}
              </span>
              <span className="sessionTime">
                {getSesDurationText(fp2_time, SESSION_DURATIONS.FP2)}
              </span>
              <span className="sessionTV">{getTvText(fp2_tv)}</span>
            </div>
          ) : (
            ""
          )}
          {fp3_time ? (
            <div className="timesRow">
              <span className="session">{venue_name === "Veľkej Británie" ? SESSION_NAMES.FP2 : SESSION_NAMES.FP3}</span>
              <span className="sessionTime">
                {getSesDurationText(fp3_time, SESSION_DURATIONS.FP3)}
              </span>
              <span className="sessionTV">{getTvText(fp3_tv)}</span>
            </div>
          ) : (
            ""
          )}
          {q_time ? (
            <div className="timesRow">
              {/* <span className="session">{SESSION_NAMES.Q}</span> */}
              <span className="session">{venue_name === "Veľkej Británie" ? "Šprint" : SESSION_NAMES.Q}</span>
              <span className="sessionTime">
                {getSesDurationText(q_time, SESSION_DURATIONS.Q)}
              </span>
              <span className="sessionTV">{getTvText(q_tv)}</span>
            </div>
          ) : (
            ""
          )}
          {r_time ? (
            <div className="timesRow">
              <span className="session">{SESSION_NAMES.R}</span>
              <span className="sessionTime">{`${r_time}`}</span>
              <span className="sessionTV">{getTvText(r_tv)}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="circuitContainer">
          <img src={circuit_map ? circuit_map : null}></img>
          <span>{circuit_name}</span>
        </div>
      </div>
    </Container>
  );
}

export default CalendarItem;
