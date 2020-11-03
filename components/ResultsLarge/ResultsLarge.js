import React from "react";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";
import SideSectionTitle from "../SideSectionTitle";
import LinkAsButton from "../LinkAsButton/LinkAsButton";
import Divider from "../Divider";

function DriverDataItem({ pos, renderID, name, team, time }) {
  return (
    <div className={styles.dataItem}>
      <span className={styles.position}>{pos}.</span>
      <div
        className={`${styles.driverBox} ${pos < 4 ? styles.red : ""}
                            ${
                              renderID === "gp"
                                ? styles.driverBoxWidthLV
                                : styles.driverBoxWidthC
                            }`}
      >
        <span className={styles.name}>{name}</span>
        <span className={styles.team}>{team}</span>
      </div>
      <span className={styles.time}>{time}</span>
    </div>
  );
}

function ResultsLarge() {
  const venueName = useSelector(
    ({ f1Results }) => f1Results.results[0].venueName
  );
  const raceData = useSelector(({ f1Results }) => f1Results.results[0].race);
  const champData = useSelector(
    ({ f1Results }) => f1Results.results[0].driverChamp
  );

  return (
    <div className={styles.outerContainer}>
      <div>
        <SideSectionTitle title={`Výsledky VC ${venueName}`} />
        <div className={styles.container}>
          {raceData.slice(1, 6).map((item, index) => (
            <DriverDataItem
              renderID="gp"
              key={index}
              pos={item.position}
              name={item.driverName}
              team={item.teamName}
              time={item.split}
            />
          ))}
          <Divider height="10px" />
          <LinkAsButton
            target="/vysledky"
            title="Kompletné výsledky pretekov"
          />
        </div>
      </div>
      <div>
        <SideSectionTitle title={`Šampionát po VC ${venueName}`} />
        <div className={styles.container}>
          {champData.slice(1, 6).map((item, index) => (
            <DriverDataItem
              key={index}
              pos={item.position}
              name={item.driverName}
              team={item.teamName}
              time={`${item.points}b`}
            />
          ))}
          <Divider height="10px" />
          <LinkAsButton
            target="/vysledky"
            title="Priebežné poradie šampionátu"
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsLarge;
