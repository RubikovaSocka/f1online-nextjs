import React, { useEffect } from "react";
import Router from "next/router";
import ReactGA from "react-ga";
import Header from "../components/Header";
import HeaderMeta from "../components/HeaderMeta";
import Footer from "../components/Footer";
import HeaderRePanel from "../components/Ads/HeaderRePanel";
import ThemeSwitcher from "../components/ThemeSwitcher";
import CookieBanner from "../components/CookieBanner";

import "./index.css";
import NProgress from "../components/nprogress";
import "../components/nprogress/nprogress.css";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store/store.js";
import { initializeTheme } from "../redux/actions/themeActions";
import fetchPanels from "../redux/apis/fetchPanelsApi";
import onClient from "../utils/onClient";
import onMobile from "../utils/onMobile";



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
    initialize();
    () => dispatch(initializeTheme());
    () => dispatch(fetchPanels());
  }, []);

  return (
    <>
      <HeaderMeta theme={theme} />
      {!onMobile() && onClient() ? <HeaderRePanel /> : ""}
      <Header theme={theme} />
      <ThemeSwitcher />
      <Component {...pageProps} />
      <Footer />
      <CookieBanner />
    </>
  );
}

export default wrapper.withRedux(App);
