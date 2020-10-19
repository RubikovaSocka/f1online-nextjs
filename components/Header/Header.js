import React from "react";
import Link from "next/link";
import { connect } from "react-redux";

import MyNavbar from "../Navbar/MyNavbar";
import SocialMediaBasicPlugin from "../SocialMediaPlugin";
import SearchBar from "../SearchBar/SearchBar";

import styles from "./style.module.scss";

function Header({ isThemeLight }) {
  return (
    <div className={styles.container}>
      <div className={styles.shadowHide} />
      <div className={styles.innerContainer}>
        <div className={styles.whiteBack}>
          <div className={styles.headerPanel}>
            <SocialMediaBasicPlugin />
            <Link href="/">
              <a>
                <img
                  className={styles.logo}
                  alt="-"
                  src={
                    isThemeLight
                      ? "https://f1online.sk/images/logo-light.png"
                      : "https://f1online.sk/images/logo-dark.png"
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

const mapStateToProps = ({ theme }) => ({
  isThemeLight: theme.isThemeLight
});

export default connect(
  mapStateToProps,
  null
)(Header);
