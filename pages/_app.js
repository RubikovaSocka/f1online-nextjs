import React, { Component } from "react";
import Router from "next/router";
import ReactGA from "react-ga";
import TrackVisibility from "react-on-screen";
import HeaderMeta from "../components/HeaderMeta";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import HeaderRePanel from "../components/Ads/HeaderRePanel/HeaderRePanel";
import ThemeSwitcher from "../components/ThemeSwitcher";
import CookieBanner from '../components/CookieBanner'

import "./index.css";
import NProgress from "../components/nprogress";
import "../components/nprogress/nprogress.css";

import { connect } from "react-redux";
import { wrapper } from "../redux/store/store.js";
import { initializeTheme } from "../redux/actions/themeActions";
import fetchPanels from "../redux/apis/fetchPanelsApi";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  ReactGA.pageview(window.location.pathname);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

class App extends Component {
  
  componentDidMount() {
    this.props.initializeTheme();
    () => this.props.initializePanels();

    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
  }

  render() {
    const { Component, pageProps, theme } = this.props;

    return (
      <>
        <HeaderMeta theme={theme} />

        <TrackVisibility partialVisibility style={{ width: "100%" }}>
          <HeaderRePanel />
        </TrackVisibility>
        <Header theme={theme} />
        <ThemeSwitcher />
        <Component {...pageProps} />
        <Footer />
        <CookieBanner />
      </>
    );
  }
}

const mapStateToProps = ({ theme }) => ({
  theme: theme.theme
});

const mapDispatchToProps = dispatch => ({
  initializeTheme: () => dispatch(initializeTheme()),
  initializePanels: () => dispatch(fetchPanels())
});

export default wrapper.withRedux(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
