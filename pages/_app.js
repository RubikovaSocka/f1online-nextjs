import React, { Component } from "react";
import Head from "next/head";
import Router from "next/router";
import ReactGA from "react-ga";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeaderRePanel from "../components/Ads/HeaderRePanel/HeaderRePanel";
import CookieBanner from "react-cookie-banner";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher.js";

import "../components/react-image-gallery/styles/scss/image-gallery.scss";
import "./index.css";
import NProgress from "../components/nprogress";
import "../components/nprogress/nprogress.css";

import cstyles from "../styles/cookiestyle.module.scss";

import { Provider } from "react-redux";
import store from "../redux/store/store.js";

const styles = {
  banner: {
    fontFamily: "HK Grotesk",
    height: "100%",
    background: "rgba(25, 25, 25, 0.8) url(/cookie.png) 20px 50% no-repeat",
    backgroundSize: "30px 30px",
    backgroundColor: "",
    fontSize: "15px",
    fontWeight: "600"
  },
  button: {
    border: "1px solid white",
    borderRadius: 0,
    width: "90px",
    height: 32,
    lineHeight: "30px",
    background: "transparent",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    opacity: 1,
    right: 20,
    marginTop: -18,
    fontFamily: "HK Grotesk"
  },
  message: {
    display: "block",
    padding: "13px 25px",
    lineHeight: 1.3,
    textAlign: "left",
    marginRight: 100,
    color: "white",
    fontWeight: "600"
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold"
  }
};

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  ReactGA.pageview(window.location.pathname);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

export default class App extends Component {
  componentDidMount() {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Head>
          <title key="meta_title">F1online.sk</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
          />
          <link key="meta_style" rel="stylesheet" href="/light-theme.css" />
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`F1online.sk`}
          />
          <meta key="meta_type" property="og:type" content="website" />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/piloti`}
          />
          <meta
            key="meta_description"
            property="og:description"
            content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`}
          />
          <meta
            key="meta_image"
            property="og:image"
            content={`https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png`}
          />
        </Head>
        <div className={cstyles.cookieContainer}>
          <CookieBanner
            styles={styles}
            message="Na zlepšenie našich služieb používame súbory cookies. Viac v časti Zásady ochrany údajov."
            //onAccept={() => {}}
            buttonMessage="Súhlasím"
            dismissOnScroll={false}
            dismissOnClick={true}
            cookie="user-cookies"
          />
        </div>
        <HeaderRePanel />
        <Header />
        <ThemeSwitcher />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    );
  }
}
