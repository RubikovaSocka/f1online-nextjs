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
          <SideSectionTitle title={`Výsledky poslednej VC`} />
          <div className={styles.container}>
            {
              /*this.props.data.RaceTable.Races[0].Results.slice(0, 5).map((positionData, index) => (
                    <DriverDataItem 
                        key={index}
                        renderID={this.props.renderID}
                        pos={positionData.position} 
                        name={`${positionData.Driver.givenName} ${positionData.Driver.familyName}`} 
                        team={positionData.Constructor.name}
                        time={
                            positionData.status === "Finished" ? 
                                `${positionData.Time.time.replace('.', ',')}${positionData.position > 1 ? 's' : ''}` :
                                positionData.status.replace("Laps", "kolá").replace("Lap", "kolo").replace("Retired", "Nedokončil")
                    }/>
                ))*/
              <div className={styles.temporaryPanel}>
                <img
                  alt="logo"
                ></img>
                <span>Štartujeme 5. júla na Red Bull Ringu!</span>
              </div>
            }
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
          <SideSectionTitle title={`Šampionát po poslednej VC`} />
          <div className={styles.container}>
            {
              /*this.props.data.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 5).map((positionData, index) => (
                                <DriverDataItem 
                                    key={index}
                                    renderID={this.props.renderID}
                                    pos={positionData.position} 
                                    name={`${positionData.Driver.givenName} ${positionData.Driver.familyName}`} 
                                    team={positionData.Constructors[positionData.Constructors.length - 1].name}
                                    time={`${positionData.points}b`}
                                />
                            ))*/
              <div className={styles.temporaryPanel}>
                <img
                  alt="logo"
                ></img>
                <span>Štartujeme 5. júla na Red Bull Ringu!</span>
              </div>
            }
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
