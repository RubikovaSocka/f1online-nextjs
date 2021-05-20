import React, { useEffect, useState } from "react";
import Router from "next/router";
import ReactGA from "react-ga";
import isbot from "isbot";
import FacebookPixel from "../components/FacebookPixel";

import Header from "../components/Header";
import HeaderMeta from "../components/HeaderMeta";
import Footer from "../components/Footer";

import ThemeSwitcher from "../components/ThemeSwitcher";
import CookieBanner from "../components/CookieBanner";
import onMobile from "../utils/onMobile";
import onClient from "../utils/onClient";
import TrackedPanel, { TYPES } from "../components/Ads/TrackedPanel";
import { POSITION } from "../components/Ads/positions";

import "./index.css";
import NProgress from "../components/nprogress";
import "../components/nprogress/nprogress.css";
import "../components/react-image-gallery/styles/scss/image-gallery.scss";

import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../redux/store/store";
import { initializeTheme } from "../redux/actions/themeActions";

import { startQuickNewsAutoFetch } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import { fetchProgramme } from "../redux/actions/programmeActions";
import { fetchPanels, resetImpressions } from "../redux/actions/panelsActions";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../components/Themes";
import { THEMES } from "../constants";

// import Gate from "../components/Gate";

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

function App({ Component, pageProps }) {
  const dispatch = useDispatch();

  const theme = useSelector(({ theme }) => theme.theme);
  const [viewIndex, setViewIndex] = useState(1);

  useEffect(() => {
    //dispatch(initializeTheme());
    let userAgentString = navigator.userAgent;
    let isCrawler = isbot(userAgentString);

    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
    if (!isCrawler) {
      ReactGA.pageview(window.location.pathname);
    }

    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      if (!isCrawler) {
        ReactGA.pageview(window.location.pathname);
      }
      setViewIndex((prev) => prev + 1);
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => NProgress.done());

    dispatch(fetchPanels());
    dispatch(fetchProgramme());
    dispatch(fetchF1Results({ perPage: 1 }));
    dispatch(startQuickNewsAutoFetch());
  }, []);

  return (
    <ThemeProvider theme={theme === THEMES.DARK ? darkTheme : lightTheme}>
      <FacebookPixel>
        <GlobalStyle />
        <HeaderMeta theme={theme} />
        <Header theme={theme} />

        <div>
          {onClient() && (
            <TrackedPanel
              type={TYPES.LEADERBOARD}
              position={POSITION.LEADERBOARD}
              key={viewIndex}
            />
          )}
        </div>
        {/* <Gate /> */}
        <ThemeSwitcher />
        <Component {...pageProps} />
        <Footer />
        <CookieBanner />
      </FacebookPixel>
    </ThemeProvider>
  );
}

// App.getInitialProps = ({ ctx }) => {
//   ctx.store.dispatch(fetchProgramme());
//   //ctx.store.dispatch(fetchF1Results({ perPage: 1 }));
//   return {};
// };

export default wrapper.withRedux(App);
