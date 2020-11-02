import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import MyNavbar from "../Navbar";
import SocialMediaBasicPlugin from "../SocialMediaPlugin";
import SearchBar from "../SearchBar";

import styles from "./style.module.scss";

import { THEMES } from "../../constants";

function Header({ theme }) {
  const logoShown = useSelector(({ logoTrigger }) => logoTrigger.logoShown);

  return (
    <div className={styles.container}>
      <div className={styles.shadowHide} />
      <div className={styles.innerContainer}>
        <div className={styles.whiteBack}>
          <div className={styles.headerPanel}>
            <SocialMediaBasicPlugin />
            <Link href="/">
              <a style={{ display: `${logoShown ? "inline-block" : "none"}` }}>
                <img
                  className={styles.logo}
                  alt="-"
                  src={
                    theme === THEMES.DARK
                      ? "https://f1online.sk/images/logo-dark.png"
                      : "https://f1online.sk/images/logo-light.png"
                  }
                />
              </a>
            </Link>
            <SearchBar />
          </div>
        </div>
        <MyNavbar />
      </div>
      <div className={styles.shadow} />
    </div>
  );
}

export default Header;
