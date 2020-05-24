import React, { Component } from "react";
import Head from "next/head";

import styles from "./ThemeSwitcher.module.scss";

export default class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeName: "",
      memoryLoaded: false
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  componentDidMount() {
    let themeName = window.localStorage.getItem("theme-name");
    this.setState({
      themeName: themeName,
      memoryLoaded: true
    });
  }

  changeTheme() {
    this.setState(({ themeName }) => {
      window.localStorage.setItem(
        "theme-name",
        themeName === "dark" ? "light" : "dark"
      );
      return { themeName: themeName === "dark" ? "light" : "dark" };
    });
  }

  render() {

    let themeHeader;
    let switcher;
    if (this.state.memoryLoaded) {
      if (this.state.themeName === "dark") {
        themeHeader = (
          <Head>
            <link key="meta_style" rel="stylesheet" href="/dark-theme.css" />
          </Head>
        );
      } else {
        themeHeader = (
          <Head>
            <link key="meta_style" rel="stylesheet" href="/light-theme.css" />
          </Head>
        );
      }

      switcher = (
        <div
          onClick={this.changeTheme}
          className={styles.themeSwitcherContainer}
        >
        {/*</div>*<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 15px 7px 10px !important;line-height: 35px !important;height:51px !important;text-decoration: none !important;display:inline-flex !important;color:#000000 !important;background-color:#FFDD00 !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 15px 7px 10px !important;font-size: 20px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Lato', sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#000000 !important;}</style>*/}
        <link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet" />
          {/*<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/F1online"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Chcem vás podporiť!" /><span>Chcem vás podporiť!</span></a>
          */}<img
            className={`${styles.lightThemeImg} ${
              this.state.themeName === "light" ? styles.selected : ""
            }`}
            alt="."
          />
          <img
            className={`${styles.darkThemeImg} ${
              this.state.themeName === "dark" ? styles.selected : ""
            }`}
            alt="."
          />
        </div>
      );
    }

    return (
      <>
        {themeHeader}
        <div className={styles.container}>{switcher}</div>
      </>
    );
  }
}
