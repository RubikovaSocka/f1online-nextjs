import { Fragment } from 'react'

import Header from '../components/Header/Header'
import Footer from "../components/Footer/Footer";

import '../components/react-image-gallery/styles/scss/image-gallery.scss';
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
