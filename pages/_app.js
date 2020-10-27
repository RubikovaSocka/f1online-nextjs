import React, {Component} from "react";
//import App from "next/app";
import Router from "next/router";
import ReactGA from "react-ga";
import TrackVisibility from "react-on-screen";
import HeaderMeta from "../components/HeaderMeta/HeaderMeta";
import Header from "../components/Header";
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

import { connect } from 'react-redux'
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store.js";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import { fetchCalendar } from "../redux/actions/calendarActions";
import { fetchProgramme } from "../redux/actions/programmeActions";
import { initializeTheme } from "../redux/actions/themeActions";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  ReactGA.pageview(window.location.pathname);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

class App extends Component {
  state = {
    showCookieBanner: false,
    cookieBanner: {},
    logoUrl: "",
    isOnClient: false
  };

  static getInitialProps = async ({ Component, ctx }) => {
    ctx.store.dispatch(fetchF1Results({ perPage: 1 }));
    ctx.store.dispatch(fetchNewQuickNews());
    ctx.store.dispatch(fetchProgramme());
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    return {
      pageProps
    };
  };

  componentDidMount() {

    this.props.initializeTheme();

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

  removeCookieBar = () => {
    localStorage.setItem("f1online-cookie-ok", "suhlasOK");
    this.setState({
      showCookieBanner: false,
      cookieBanner: {}
    });
  };

  render() {
    const { Component, pageProps, theme } = this.props;

    return (
      <>
        <HeaderMeta theme={theme} />
        {this.state.showCookieBanner ? this.state.cookieBanner : ""}
        <TrackVisibility partialVisibility style={{ width: "100%" }}>
          <HeaderRePanel />
        </TrackVisibility>
        <Header />
        <ThemeSwitcher />
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ theme }) => ({
  theme: theme.theme
});

const mapDispatchToProps = dispatch => ({
  initializeTheme: () => dispatch(initializeTheme())
});

export default wrapper.withRedux(connect(mapStateToProps, mapDispatchToProps)(App));
