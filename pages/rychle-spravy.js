import React, { Component, Fragment } from "react";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import CalResWidget from "../components/CalResWidget/CalResWidget";
import formatDate from "../utils/dateFormatter";
import LoadingSpinner from "../components/LoadingSpinner";

import SectionTitle from "../components/SectionTitle/SectionTitle";
import Divider from "../components/Divider";

import EmbedContainer from "react-oembed-container";
import styles from "../styles/rychle-spravy.module.scss";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";

export class QuickNewsPage extends Component {
  state = {
    newsArray: [],
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=12`
      )
      //.then(res => console.log(res))
      .then(res =>
        this.setState({
          newsArray: res.data,
          isLoaded: true
        })
      );
    //.catch(err => console.log(err))
  }

  render() {
    let news;
    if (this.state.isLoaded) {
      news = (
        <Fragment>
          <SectionTitle title="Rýchle správy" />
          <Divider height="20px" />
          <div className={styles.newsBlock}>
            {this.state.newsArray.map(newsItem => (
              <div className={styles.newsItemContainer}>
                <span className={styles.date}>{formatDate(newsItem.date)}</span>
                <div
                  className={styles.text}
                  dangerouslySetInnerHTML={{
                    __html: newsItem.acf.obsah_rychlej_spravy
                  }}
                />
                <EmbedContainer markup={newsItem.acf.embed_zo_socialnych_sieti}>
                  <div
                    className={styles.embed}
                    dangerouslySetInnerHTML={{
                      __html: newsItem.acf.embed_zo_socialnych_sieti
                    }}
                  ></div>
                </EmbedContainer>
              </div>
            ))}
            <Link href="/rychle-spravy">
              <a
                className="basicButton"
                style={{ marginTop: "10px", width: "200px" }}
              >
                Viac rýchlych správ
              </a>
            </Link>
          </div>
        </Fragment>
      );
    } else {
      news = <LoadingSpinner />;
    }

    return (
      <>
        <Head>
          <title key="meta_title">Rýchle správy | F1online.sk</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`Rýchle správy | F1online.sk`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/rychle-spravy`}
          />
        </Head>
        <MAIN>
          <COLUMNED_PAGE>
            <PAGE_MAIN_COL>{news}</PAGE_MAIN_COL>
            <SIDEBAR>
              <Divider height="50px" />
              <CalResWidget />
            </SIDEBAR>
          </COLUMNED_PAGE>
        </MAIN>
      </>
    );
  }
}

export default QuickNewsPage;
