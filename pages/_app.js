import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router';

import Header from '../components/Header/Header'
import Footer from "../components/Footer/Footer";
import Fonts from '../utils/Fonts'
import Ads from '../components/Ads/HeaderRePanel'

import '../components/react-image-gallery/styles/scss/image-gallery.scss';
import './index.css'
import NProgress from '../components/nprogress'
import '../components/nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
    
    useEffect(() => {
        Fonts()
    }, []);

    return (
        <Fragment>
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
