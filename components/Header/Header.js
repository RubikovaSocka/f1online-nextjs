import React from "react";
import Link from "next/link";

import MyNavbar from "../Navbar/MyNavbar";
import SocialMediaBasicPlugin from "../SocialMediaPlugin/SocialMediaPlugin";
import SearchBar from "../SearchBar/SearchBar";

import styles from "./Header.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeTheme } from "../../redux/actions/themeActions";

class Header extends React.Component {
  render() {
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
                    src={
                      this.props.isThemeLight
                        ? "https://f1online.sk/images/logo-light.png"
                        : "https://f1online.sk/images/logo-dark.png"
                    }
                    alt="-"
                  ></img>
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

Header.propTypes = {
  changeTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isThemeLight: state.theme.isThemeLight,
  lightTheme: state.theme.lightTheme,
  darkTheme: state.theme.darkTheme
});

export default connect(
  mapStateToProps,
  { changeTheme }
)(Header);
