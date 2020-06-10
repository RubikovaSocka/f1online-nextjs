import React from "react";
import styles from "./ButtonWB.module.scss";
import Link from "next/link";

export default function ButtonWB(props) {
  return (
    <Link href={props.hrefProp} as={props.asProp}>
      <a className={styles.button}>
        {props.title ? props.title : "Pozrieť všetky"}
      </a>
    </Link>
  );
}
