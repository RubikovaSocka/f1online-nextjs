import React, { Component } from "react";
import styles from "./SocialMediaPlugin.module.scss";

export default class SocialMediaBasicPlugin extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.item}>
          <a
            className="noOutline"
            href="https://www.facebook.com/f1online.sk/"
            rel="noreferrer"
            target="_blank"
          >
            <img alt="." className={styles.fbImg} />
          </a>
        </div>
        <div className={styles.item}>
          <a
            href="https://www.instagram.com/stevoeiselef1/"
            rel="noreferrer"
            target="_blank"
            className="noOutline"
          >
            <img alt="." className={styles.instaImg} />
          </a>
        </div>
      </div>
    );
  }
}
