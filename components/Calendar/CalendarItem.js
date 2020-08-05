import React, { Component } from "react";
import styles from "./CalendarItem.module.scss";
import { addMinutes, format, parse } from "date-fns";
import Media from "react-media";
export default class CalendarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  changeState() {
    this.setState(prev => {
      return {
        opened: !prev.opened
      };
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div
        className={`${styles.container} ${
          this.state.opened ? styles.opened : styles.closed
        }`}
      >
        <Media query={{ maxWidth: 1023 }}>
          {matches =>
            matches ? (
              <div
                className={`${styles.header} ${
                  this.state.opened ? styles.opened : styles.closed
                }`}
                onClick={() => this.changeState()}
              >
                <div>
                  <span className={styles.venueName}>{`${this.props.position +
                    1}. VC ${data.venue_name}`}</span>
                  <div className={styles.venueHeaderDate}>
                    <span className={styles.date}>{data.venue_date}</span>
                    <span className={styles.raceTime}>{data.r_time}</span>
                  </div>
                </div>
                <i
                  className={`fas fa-chevron-${
                    this.state.opened ? "up" : "down"
                  }`}
                ></i>
              </div>
            ) : (
              <div
                className={`${styles.header} ${
                  this.state.opened ? styles.opened : styles.closed
                }`}
                onClick={() => this.changeState()}
              >
                <i
                  className={`fas fa-chevron-${
                    this.state.opened ? "up" : "down"
                  }`}
                ></i>
                <span className={styles.venueName}>{`${this.props.position +
                  1}. VC ${data.venue_name}`}</span>
                <div className={styles.venueHeaderDate}>
                  <span className={styles.date}>
                    {data.venue_date
                      .split("-")[1]
                      .trim()
                      .replace(" 2020", "")}
                  </span>
                  <span className={styles.raceTime}>{data.r_time}</span>
                </div>
              </div>
            )
          }
        </Media>

        <div
          className={`${styles.contentBox} ${
            this.state.opened ? styles.opened : styles.closed
          }`}
        >
          <div className={styles.table}>
            <div className={`${styles.timesRow} ${styles.timesRowHeader}`}>
              <span className={styles.session}>Časť</span>
              <span className={styles.sessionTime}>Čas</span>
              <span className={styles.sessionTv}>Vysiela</span>
            </div>
            {data.fp1_time ? (
              <div className={styles.timesRow}>
                <span className={styles.session}>1. tréning</span>
                <span className={styles.sessionTime}>{`${
                  data.fp1_time
                } - ${format(
                  addMinutes(parse(data.fp1_time, "HH:mm", new Date()), 90),
                  "HH:mm"
                )}`}</span>
                <span className={styles.sessionTv}>
                  {data.fp1_tv ? data.fp1_tv : "Doplníme..."}
                </span>
              </div>
            ) : (
              ""
            )}

            {data.fp2_time ? (
              <div className={styles.timesRow}>
                <span className={styles.session}>2. tréning</span>
                <span className={styles.sessionTime}>{`${
                  data.fp2_time
                } - ${format(
                  addMinutes(parse(data.fp2_time, "HH:mm", new Date()), 90),
                  "HH:mm"
                )}`}</span>
                <span className={styles.sessionTv}>
                  {data.fp2_tv ? data.fp2_tv : "Doplníme..."}
                </span>
              </div>
            ) : (
              ""
            )}
            {data.fp3_time ? (
              <div className={styles.timesRow}>
                <span className={styles.session}>3. tréning</span>
                <span className={styles.sessionTime}>{`${
                  data.fp3_time
                } - ${format(
                  addMinutes(parse(data.fp3_time, "HH:mm", new Date()), 90),
                  "HH:mm"
                )}`}</span>
                <span className={styles.sessionTv}>
                  {data.fp3_tv ? data.fp3_tv : "Doplníme..."}
                </span>
              </div>
            ) : (
              ""
            )}
            {data.q_time ? (
              <div className={styles.timesRow}>
                <span className={styles.session}>Kvalifikácia</span>
                <span className={styles.sessionTime}>{`${
                  data.q_time
                } - ${format(
                  addMinutes(parse(data.q_time, "HH:mm", new Date()), 90),
                  "HH:mm"
                )}`}</span>
                <span className={styles.sessionTv}>
                  {data.q_tv ? data.q_tv : "Doplníme..."}
                </span>
              </div>
            ) : (
              ""
            )}
            {data.r_time ? (
              <div className={styles.timesRow}>
                <span className={styles.session}>Preteky</span>
                <span className={styles.sessionTime}>{`${
                  data.r_time
                } - ${format(
                  addMinutes(parse(data.r_time, "HH:mm", new Date()), 90),
                  "HH:mm"
                )}`}</span>
                <span className={styles.sessionTv}>
                  {data.r_tv ? data.r_tv : "Doplníme..."}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.circuitContainer}>
            <img src={data.circuit_map}></img>
            <span>{data.circuit_name}</span>
          </div>
        </div>
      </div>
    );
  }
}
