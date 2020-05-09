import { Fragment } from 'react'

import Header from '../components/Header/Header'
import Footer from "../components/Footer/Footer";

import './index.css'

export default function App({ Component, pageProps }) {
  return (
        <Fragment>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </Fragment>
  )
}
