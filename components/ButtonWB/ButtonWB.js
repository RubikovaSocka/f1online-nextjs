import React from "react";
import Link from "next/link";

import styles from "./style.module.scss";

export default function ButtonWB({ hrefProp, asProp, title }) {
  return (
    <Link href={hrefProp} as={asProp}>
      <a className={styles.button}>{title ? title : "Pozrieť všetky"}</a>
    </Link>
  );
}
