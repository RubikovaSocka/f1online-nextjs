import React, { Component } from "react";
import Link from "next/link";

import styles from "./NotLoggedAlertBox.module.scss";

export default class NotLoggedAlertBox extends Component {
  render() {
    return (
      <div className={styles.container}>
        Aby si mohol komentovať, musíš sa prihlásiť alebo&nbsp;
        <Link href={`/registracia`} as={`/registracia`}>
          <a>
            <span>registrovať</span>
          </a>
        </Link>
        .
      </div>
    );
  }
}
