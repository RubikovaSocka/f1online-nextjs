import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router';
import ReactGA from 'react-ga'
import Header from '../components/Header/Header'
import Footer from "../components/Footer/Footer";
import Fonts from '../utils/Fonts'
import Ads from '../components/Ads/HeaderRePanel'
import CookieBanner from 'react-cookie-banner';

import '../components/react-image-gallery/styles/scss/image-gallery.scss';
import './index.css'
import NProgress from '../components/nprogress'
import '../components/nprogress/nprogress.css';
import { Z_FIXED } from 'zlib';

const styles = {
    banner: {
      fontFamily: 'HK Grotesk',
      height: 57,
      background: 'rgba(25, 25, 25, 0.8) url(/cookie.png) 20px 50% no-repeat',
      backgroundSize: '30px 30px',
      backgroundColor: '',
      fontSize: '15px',
      fontWeight: '600'
    },
    button: {
      border: '1px solid white',
      borderRadius: 4,
      width: '90px',
      height: 32,
      lineHeight: '32px',
      background: 'transparent',
      color: 'white',
      fontSize: '14px',
      fontWeight: 600,
      opacity: 1,
      right: 20,
      marginTop: -18
    },
    message: {
      display: 'block',
      padding: '9px 67px',
      lineHeight: 1.3,
      textAlign: 'left',
      marginRight: 244,
      color: 'white',
      fontWeight: '600'
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  }

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => { 
    ReactGA.pageview(window.location.pathname);
    NProgress.done()
}); 
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {

    useEffect(() => {
        const trackingId = "UA-166048655-1";
        ReactGA.initialize(trackingId);
        if (Object.keys(window.location.pathname).length != 0) {
            //ReactGA.viewpage(window.location.pathname + window.location.search);
        }
        Fonts()
    }, []);

    return (
        <Fragment>
            <div style={{position: 'fixed', bottom: '0', height: '0', zIndex: '200'}}>
                <CookieBanner
                    styles={styles}
                    message="Na zlepšenie našich služieb používame súbory cookies. Prehliadaním webu súhlasíte s ich využitím."
                    //onAccept={() => {}}
                    buttonMessage='Súhlasím'
                    dismissOnScroll={true}
                    dismissOnClick={true}
                    cookie="user-has-accepted-cookies" />
            </div>
            <Ads />
            <Head>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" />
            </Head>
            <Header />
            
            <Component {...pageProps} />
            <Footer />
            
        </Fragment>
    )
}
