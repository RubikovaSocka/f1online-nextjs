import React, { Component } from "react";
import { Container, Chevron } from "./Containers";

export default class LastVenueResBox extends Component {
  state = {
    opened: false
  };

  changeState = () => {
    this.setState(prev => {
      return {
        opened: !prev.opened
      };
    });
  };

  render() {
    const { data } = this.props;
    return (
      <Container className={this.state.opened ? "opened" : "closed"}>
        <div
          onClick={() => this.changeState()}
          className={`header ${this.state.opened ? "opened" : "closed"}`}
        >
          <Chevron isOpened={this.state.opened} />
          <span>Výsledky VC {this.props.venueName} 2021</span>
        </div>
        <div
          className={`contentBox venueResult ${
            this.state.opened ? "opened" : "closed"
          }`}
        >
          <div className="table">
            {data.map((item, index) =>
              index === 0 ? (
                <div key={index} className="tableRow tableHeader">
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
      </Container>
    );
  }
}
