import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";

import styles from "../styles/kalendar.module.scss";
import Divider from "../components/Divider.js";
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: {},
      isLoaded: false
    };
  }
  /*
    componentDidMount() {
        axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/calendar?per_page=1`)
            .then(res => {
                this.setState({
                    calendarData: res.data[0],
                    isLoaded: true
                })
            })
            .catch(err => console.log(err))
    }
*/
  render() {
    let contentData;
    //if(this.state.isLoaded) {
    contentData = (
      <div className={styles.container}>
        <img
          className={styles.annLogo}
          alt="logo f1online.sk"
        />
        <span
          className={styles.announcement}
        >{`Zverejníme po aktualizácii kalendára na rok 2020`}</span>
      </div>
    );
    //}

    return (
      <>
        <Head>
          <title key="meta_title">Kalendár | F1online.sk</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`Kalendár | F1online.sk`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/kalendar`}
          />
        </Head>
        <main className="contentsPage">
          <div className="page">
            <div className="mainContent">
              <SectionTitle title="Kalendár" />
              {contentData}
            </div>
            <aside className="sideBar">
              <Divider height="50px" />
              <QuickNews />
              <RPanel />
            </aside>
          </div>
        </main>
      </>
    );
  }
}
