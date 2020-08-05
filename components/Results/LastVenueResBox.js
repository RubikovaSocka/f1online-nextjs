import React, { Component } from "react";
import styles from "./BasicStyle.module.scss";

export default class LastVenueResBox extends Component {
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
        <div
          className={`${styles.header} ${
            this.state.opened ? styles.opened : styles.closed
          }`}
          onClick={() => this.changeState()}
        >
          <i
            className={`fas fa-chevron-${this.state.opened ? "up" : "down"}`}
          ></i>
          <span>Výsledky VC {this.props.venueName} 2020</span>
        </div>
        <div
          className={`${styles.contentBox} ${
            this.state.opened ? styles.opened : styles.closed
          } ${styles.venueResult}`}
        >
          <div className={styles.table}>
            {data.map((item, index) =>
              index === 0 ? (
                <div key={index} className={`${styles.tableRow} ${styles.tableHeader}`}>
                  <span className={styles.position}>{item.position}</span>
                  <span className={styles.name}>{item.driverName}</span>
                  <span className={styles.team}>{item.teamName}</span>
                  <span className={styles.laps}>{item.laps}</span>
                  <span className={styles.split}>{item.split}</span>
                  <span className={styles.points}>{item.points}</span>
                </div>
              ) : (
                <div key={index} className={`${styles.tableRow}`}>
                  <span className={styles.position}>
                    {item.position}
                    {item.position === "-" ? "" : "."}
                  </span>
                  <span className={styles.name}>{item.driverName}</span>
                  <span className={styles.team}>{item.teamName}</span>
                  <span className={styles.laps}>{item.laps}</span>
                  <span className={styles.split}>{item.split}</span>
                  <span className={styles.points}>{item.points}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
