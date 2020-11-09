import React, { useState } from "react";
import onMobile from "../../utils/onMobile";
import { Container, Chevron } from "./Containers";

export default function DriverChampResBox({ data, venueName }) {
  const [opened, setOpened] = useState(false);

  return (
    <Container className={opened ? "opened" : "closed"}>
      <div
        onClick={() => setOpened(prev => !prev)}
        className={`header ${opened ? "opened" : "closed"}`}
      >
        <Chevron isOpened={opened} />
        <span>Poradie jazdcov po VC {venueName} 2020</span>
      </div>
      <div className={`contentBox venueResult ${opened ? "opened" : "closed"}`}>
        {onMobile() ? (
          <div
            className={`contentBox champResult ${opened ? "opened" : "closed"}`}
          >
            <div className="table">
              {data.map((item, index) =>
                index === 0 ? (
                  <div key={index} className={`tableRow tableHeader`}>
                    <span className="position">{item.position}</span>
                    <span className="name">{item.driverName}</span>
                    <span className="points">{item.points}</span>
                  </div>
                ) : (
                  <div key={index} className="tableRow">
                    <span className="position">
                      {item.position}
                      {item.position === "-" ? "" : "."}
                    </span>
                    <span className="name">{item.driverName}</span>
                    <span className="points">{item.points}</span>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div
            className={`contentBox champResult ${opened ? "opened" : "closed"}`}
          >
            <div className="table">
              {data.map((item, index) =>
                index === 0 ? (
                  <div key={index} className={`tableRow tableHeader`}>
                    <span className="position">{item.position}</span>
                    <span className="name">{item.driverName}</span>
                    <span className="team">{item.teamName}</span>
                    <span className="laps">{item.laps}</span>
                    <span className="split">{item.split}</span>
                    <span className="points">{item.points}</span>
                  </div>
                ) : (
                  <div key={index} className="tableRow">
                    <span className="position">
                      {item.position}
                      {item.position === "-" ? "" : "."}
                    </span>
                    <span className="name">{item.driverName}</span>
                    <span className="team">{item.teamName}</span>
                    <span className="laps">{item.laps}</span>
                    <span className="split">{item.split}</span>
                    <span className="points">{item.points}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
