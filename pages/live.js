import React, { Component } from "react";
import styles from "../styles/live.module.scss";

export default class live extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      window.location.replace("https://live.f1online.sk");
    }
  }
  render() {
    return <div className={styles.container}></div>;
  }
}
