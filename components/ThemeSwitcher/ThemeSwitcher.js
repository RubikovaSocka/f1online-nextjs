import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./ThemeSwitcher.module.scss";
import ReactGA from "react-ga";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeTheme } from "../../redux/actions/themeActions";

class ThemeSwitcher extends Component {
  state = {
    isThemeLight: true
  };
  
  componentDidMount() {
    this.props.changeTheme({
      themeName: window.localStorage.getItem("theme-name")
        ? window.localStorage.getItem("theme-name")
        : "light"
    });
  }

  changeTheme = () => {
    window.localStorage.setItem(
      "theme-name",
      this.props.isThemeLight ? "dark" : "light"
    );
    this.props.changeTheme({
      themeName: this.props.isThemeLight ? "dark" : "light"
    });
  };

  handleClick() {
    ReactGA.event({
      category: "donate",
      action: "donation-link-clicked",
      label: "donation"
    });
  }

  render() {
    const { isThemeLight } = this.props;

    return (
      <>
        <Head>
          <link
            key="meta_style"
            rel="stylesheet"
            href={`/${isThemeLight ? "light" : "dark"}-theme.css`}
          />
        </Head>
        <div className={styles.container}>
          <Link href="/chcem-vas-podporit">
            <a className={styles.donateButton}>Chcem podporiť F1online.sk</a>
          </Link>
          {/*
          <div className={styles.donateButtonContainer}>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_blank"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="hosted_button_id"
                value="JKBMX6G3DWTRQ"
              />
              <input
                className={styles.donateButtonSmall}
                type="image"
                src="/images/donate-button-small.png"
                border="0"
                name="submit"
                title="Podporiť F1online.sk cez PayPal alebo kreditnú kartu"
                alt="Donate with PayPal button"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypal.com/en_SK/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </div>*/}
          <div
            onClick={this.changeTheme}
            className={styles.themeSwitcherContainer}
          >
            <link
              href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
              rel="stylesheet"
            />
            <img
              className={`${styles.lightThemeImg} ${
                this.state.isThemeLight ? styles.selected : ""
              }`}
              alt="."
            />
            <img
              className={`${styles.darkThemeImg} ${
                this.state.isThemeLight ? "" : styles.selected
              }`}
              alt="."
            />
          </div>
        </div>
      </>
    );
  }
}

ThemeSwitcher.propTypes = {
  changeTheme: PropTypes.func.isRequired
};

const mapStateToProps = ({ theme }) => ({
  isThemeLight: theme.isThemeLight
});

const mapDispatchToProps = dispatch => ({
  changeTheme: () => dispatch(changeTheme())
});

export default connect(
  mapStateToProps,
  { changeTheme }
)(ThemeSwitcher);
