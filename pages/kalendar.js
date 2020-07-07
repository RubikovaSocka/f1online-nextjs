import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import CalendarBox from "../components/Calendar/CalendarBox.js";
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

  componentDidMount() {
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/calendar?per_page=25`)
      .then(res => {
        this.setState({
          calendarData: res.data,
          isLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let contentData;
    if (this.state.isLoaded) {
      console.log("ok");
      console.log(this.state.calendarData);
      contentData = <CalendarBox data={this.state.calendarData} />;
    }

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
              <Divider height="28px" />
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
