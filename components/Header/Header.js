import React from "react";
import Link from "next/link";

import MyNavbar from "../Navbar/MyNavbar";
import SocialMediaBasicPlugin from "../SocialMediaPlugin/SocialMediaPlugin";
import SearchBar from "../SearchBar/SearchBar";

import styles from "./Header.module.scss";

class Header extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.shadowHide} />
        <div className={styles.innerContainer}>
          <div className={styles.whiteBack}>
            <div className={styles.headerPanel}>
              <SocialMediaBasicPlugin />
              <Link href="/" as="/">
                <a>
                  <img className={styles.logo} alt="-" />
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
}

export default Header;
