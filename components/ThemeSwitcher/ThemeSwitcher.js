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
          <img
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
