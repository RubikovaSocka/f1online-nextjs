import React from "react";
import Link from "next/link";
import styles from "./ThemeSwitcher.module.scss";
import { useSelector } from "react-redux";
import { setTheme } from "../../redux/actions/themeActions";
import { THEMES } from "../../constants";
import { useDispatch } from "react-redux";

const getOtherTheme = theme => {
  switch (theme) {
    case THEMES.LIGHT:
      return THEMES.DARK;
    case THEMES.DARK:
      return THEMES.LIGHT;

    default:
      THEMES.LIGHT;
  }
};

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme.theme);

  return (
    <div className={styles.container}>
      <Link href="/chcem-vas-podporit">
        <a className={styles.donateButton}>Chcem podporiť F1online.sk</a>
      </Link>
      <button
        onClick={() => dispatch(setTheme(getOtherTheme(theme)))}
        className={styles.themeSwitcherContainer}
      >
        <img
          className={`${styles.lightThemeImg} ${
            theme === THEMES.LIGHT ? styles.selected : ""
          }`}
          alt="Light theme icon"
        />
        <img
          className={`${styles.darkThemeImg} ${
            theme === THEMES.DARK ? "" : styles.selected
          }`}
          alt="Dark theme icon"
        />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
