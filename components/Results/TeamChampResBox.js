import React, { Component } from "react";
import styles from "./BasicStyle.module.scss";
import tableStyles from './TeamChampResBox.module.scss'
import Media from "react-media";

export default class TeamChampResBox extends Component {
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
          <span>Poradie konštruktérov po VC {this.props.venueName} 2020</span>
        </div>
        <Media query={{ maxWidth: 1023 }}>
          {matches =>
            matches ? (
              <div
                className={`${styles.contentBox} ${
                  this.state.opened ? styles.opened : styles.closed
                } ${styles.teamResult}`}
              >
                <div className={styles.table}>
                  {this.props.data.map((item, index) =>
                    index === 0 ? (
                      <div
                        className={`${styles.tableRow} ${styles.tableHeader}`}
                      >
                        <span className={styles.position}>{item.position}</span>
                        <span className={styles.name}>{item.teamName}</span>
                        <span className={styles.points}>{item.points}</span>
                      </div>
                    ) : (
                      <div className={`${styles.tableRow}`}>
                        <span className={styles.position}>
                          {item.position}
                          {item.position === "-" ? "" : "."}
                        </span>
                        <span className={styles.name}>{item.teamName}</span>
                        <span className={styles.points}>{item.points}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div
                className={`${styles.contentBox} ${
                  this.state.opened ? styles.opened : styles.closed
                } ${styles.teamResult}`}
              >
                <div className={styles.table}>
                  {this.props.data.map((item, index) =>
                    index === 0 ? (
                      <div
                        className={`${styles.tableRow} ${styles.tableHeader}`}
                      >
                        <span className={styles.position}>{item.position}</span>

                        <span className={styles.name}>{item.teamName}</span>
                        <span className={styles.team}>{item.driverName}</span>
                        <span className={styles.laps}>{item.laps}</span>
                        <span className={styles.split}>{item.split}</span>
                        <span className={styles.points}>{item.points}</span>
                      </div>
                    ) : (
                      <div className={`${styles.tableRow}`}>
                        <span className={styles.position}>
                          {item.position}
                          {item.position === "-" ? "" : "."}
                        </span>
                        <span className={styles.name}>{item.teamName}</span>
                        <span className={styles.team}>{item.driverName}</span>

                        <span className={styles.laps}>{item.laps}</span>
                        <span className={styles.split}>{item.split}</span>
                        <span className={styles.points}>{item.points}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          }
        </Media>
      </div>
    );
  }
}
