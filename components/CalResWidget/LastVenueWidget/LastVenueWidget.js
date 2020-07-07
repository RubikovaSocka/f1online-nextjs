import React, { Component } from "react";
import styles from "./LastVenueWidget.module.scss";

function ResultsHeaderRow(props) {
  return (
    <div className={`${styles.resultsRow} ${styles.header}`}>
      <span className={`${styles.position} ${styles.header}`}>Poz.</span>
      <span className={styles.driver}>Pilot</span>
      <span className={styles.time}>Čas/strata</span>
    </div>
  );
}

function ResultsRow(props) {
  return (
    <div
      className={`${styles.resultsRow} ${
        props.pos === "1" ? styles.noBorder : ""
      }`}
    >
      <span className={styles.position}>{props.pos}.</span>
      <span className={styles.driver}>{props.name}</span>
      <span className={styles.time}>{props.time}</span>
    </div>
  );
}

class LastVenueWidget extends Component {
  render() {
    const { venueName, data } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.venueBlock}>
          <p
            className={styles.venueTitle}
          >{`Výsledky VC ${this.props.venueName}`}</p>
        </div>
        <ResultsHeaderRow />
        {data.slice(1, 11).map(positionData => (
          <ResultsRow
            pos={positionData.position}
            name={positionData.driverName}
            time={positionData.split}
          />
        ))}
      </div>
    );
  }
}
export default LastVenueWidget;
