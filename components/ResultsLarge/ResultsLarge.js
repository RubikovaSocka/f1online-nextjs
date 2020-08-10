import React, { Component } from "react";

import styles from "./ResultsLarge.module.scss";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import LinkAsButton from "../LinkAsButton/LinkAsButton";
import Divider from "../Divider";

function DriverDataItem(props) {
  return (
    <div className={styles.dataItem}>
      <span className={styles.position}>{props.pos}.</span>
      <div
        className={`${styles.driverBox} 
                            ${
                              props.renderID === "gp"
                                ? styles.driverBoxWidthLV
                                : styles.driverBoxWidthC
                            }
                            ${props.pos < 4 ? styles.red : ""}`}
      >
        <span className={styles.name}>{props.name}</span>
        <span className={styles.team}>{props.team}</span>
      </div>
      <span className={styles.time}>{props.time}</span>
    </div>
  );
}

class ResultsLarge extends Component {
  render() {
    if (this.props.renderID === "gp") {
      return (
        <div>
          <SideSectionTitle title={`Výsledky VC ${this.props.venueName}`} />
          <div className={styles.container}>
            {this.props.data.slice(1, 6).map((positionData, index) => (
              <DriverDataItem
                key={index}
                renderID={this.props.renderID}
                pos={positionData.position}
                name={positionData.driverName}
                team={positionData.teamName}
                time={positionData.split}
              />
            ))}
            <Divider height="10px" />
            <LinkAsButton
              target="/vysledky"
              title="Kompletné výsledky pretekov"
            />
          </div>
        </div>
      );
    } else if (this.props.renderID === "champ") {
      return (
        <div>
          <SideSectionTitle title={`Šampionát po VC ${this.props.venueName}`} />
          <div className={styles.container}>
            {this.props.data.slice(1, 6).map((positionData, index) => (
              <DriverDataItem
                key={index}
                renderID={this.props.renderID}
                pos={positionData.position}
                name={positionData.driverName}
                team={positionData.teamName}
                time={`${positionData.points}b`}
              />
            ))}
            <Divider height="10px" />
            <LinkAsButton
              target="/vysledky"
              title="Priebežné poradie šampionátu"
            />
          </div>
        </div>
      );
    }
  }
}
export default ResultsLarge;
