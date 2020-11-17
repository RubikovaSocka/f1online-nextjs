import React, { useEffect } from "react";
import Router from "next/router";
import ReactGA from "react-ga";
import Header from "../components/Header";
import HeaderMeta from "../components/HeaderMeta";
import Footer from "../components/Footer";
import TrackedHeaderPanel from "../components/Ads/HeaderRePanel";
import ThemeSwitcher from "../components/ThemeSwitcher";
import CookieBanner from "../components/CookieBanner";

import "./index.css";
import NProgress from "../components/nprogress";
import "../components/nprogress/nprogress.css";
import "../components/react-image-gallery/styles/scss/image-gallery.scss";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store/store.js";
import { initializeTheme } from "../redux/actions/themeActions";
import { fetchPanels } from "../redux/actions/panelsActions";
import onClient from "../utils/onClient";
import onMobile from "../utils/onMobile";

import { startQuickNewsAutoFetch } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import { fetchProgramme } from "../redux/actions/programmeActions";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../components/Themes";
import { THEMES } from "../constants";

const GlobalStyle = createGlobalStyle`
    *,
  input,
  button {
    outline: none !important;
  }
  a {
    text-decoration: none;
  }

  html,
  body {
    margin: 0;
    height: 100%;
  }

  .noOutline {
    text-decoration: none;
    outline: none;
  }

  #__next {
    min-height: calc(100% - 60px);
    padding-bottom: 60px;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.PAGE_BACK_COLOR}
  }
`;

const initialize = () => {
  const trackingId = "UA-166048655-1";
  ReactGA.initialize(trackingId);

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    ReactGA.pageview(window.location.pathname);
    NProgress.done();
  });
  Router.events.on("routeChangeError", () => NProgress.done());
};

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme.theme);

  useEffect(() => {
    dispatch(initializeTheme());
    initialize();
    dispatch(fetchF1Results({ perPage: 1 }));
    dispatch(fetchProgramme());
    dispatch(startQuickNewsAutoFetch());
    dispatch(fetchPanels());
  }, []);

  return (
    <ThemeProvider theme={theme === THEMES.DARK ? darkTheme : lightTheme}>
      <GlobalStyle />
      <HeaderMeta theme={theme} />
      {!onMobile() && onClient() ? <TrackedHeaderPanel changeable={true} /> : ""}
      <Header theme={theme} />
      <ThemeSwitcher />
      <Component {...pageProps} />
      <Footer />
      <CookieBanner />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
