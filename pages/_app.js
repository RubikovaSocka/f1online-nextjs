import React, { Component } from "react";
import Router from "next/router";
import ReactGA from "react-ga";
import HeaderMeta from "../components/HeaderMeta/HeaderMeta";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeaderRePanel from "../components/Ads/HeaderRePanel/HeaderRePanel";
import CookieBanner from "react-cookie-banner";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher.js";

import "../components/react-image-gallery/styles/scss/image-gallery.scss";
import "./index.css";
import NProgress from "../components/nprogress";
import "../components/nprogress/nprogress.css";

import { mobileStyles, pcStyles } from "../styles/cookieNotification.js";
import cstyles from "../styles/cookiestyle.module.scss";

import { changeTheme } from "../redux/actions/themeActions";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  ReactGA.pageview(window.location.pathname);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCookieBanner: false,
      cookieBanner: {},
      logoUrl: "",
      isOnClient: false
    };
    this.removeCookieBar = this.removeCookieBar.bind(this);
  }

  componentDidMount() {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);

    if (!(localStorage.getItem("f1online-cookie-ok") === "suhlasOK")) {
      this.setState({
        showCookieBanner: true,
        cookieBanner: (
          <CookieBanner
            styles={window.innerWidth < 400 ? mobileStyles : pcStyles}
            className={`${cstyles.cookieContainer}`}
            message="Na zlepšenie našich služieb používame súbory cookies. Viac v časti Zásady ochrany údajov."
            onAccept={() => {
              this.removeCookieBar();
            }}
            buttonMessage="Súhlasím"
            dismissOnScroll={false}
            dismissOnClick={true}
            cookie="user-cookies"
          />
        )
      });
    }
  }

  removeCookieBar() {
    localStorage.setItem("f1online-cookie-ok", "suhlasOK");
    this.setState({
      showCookieBanner: false,
      cookieBanner: {}
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <HeaderMeta />
        {this.state.showCookieBanner ? this.state.cookieBanner : ""}
        <HeaderRePanel />
        <Header />
        <ThemeSwitcher />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    );
  }
}

