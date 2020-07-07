import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import Divider from "../components/Divider.js";
import styles from "../styles/vysledky.module.scss";
import LastVenueResBox from "../components/Results/LastVenueResBox.js";
import DriverChampResBox from "../components/Results/DriverChampResBox.js";
import TeamChampResBox from "../components/Results/TeamChampResBox.js";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueName: "",
      lastVenueResults: {},
      lastVenueLoaded: false,
      driverChampResults: {},
      driverChampLoaded: false,
      teamChampResults: {},
      teamChampLoaded: false
    };
  }

  componentDidMount() {
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/results?per_page=1`)
      .then(res => {
        console.log(res)
        axios.get(res.data[0].acf.results_json).then(res2 => {
          this.setState({
            lastVenueResults: res2.data,
            lastVenueLoaded: true,
            venueName: res.data[0].acf.venue_name
          })
        })
        axios.get(res.data[0].acf.cd_results_json).then(res => {
          this.setState({
            driverChampResults: res.data,
            driverChampLoaded: true
          })
        })
        axios.get(res.data[0].acf.cc_results_json).then(res => {
          this.setState({
            teamChampResults: res.data,
            teamChampLoaded: true
          })
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    let contentData;
    if (this.state.driverChampLoaded && this.state.teamChampLoaded && this.state.lastVenueLoaded) {
      contentData = (
        <>
          <LastVenueResBox venueName={this.state.venueName} data={this.state.lastVenueResults} />
          <Divider height="15px" />
          <DriverChampResBox venueName={this.state.venueName} data={this.state.driverChampResults} />
          <Divider height="15px" />
          <TeamChampResBox venueName={this.state.venueName} data={this.state.teamChampResults} />
        </>
      );
    }

    return (
      <>
        <Head>
          <title key="meta_title">Výsledky | F1online.sk</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`Výsledky | F1online.sk`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/vysledky`}
          />
        </Head>
        <main className="contentsPage">
          <div className="page">
            <div className="mainContent">
              <SectionTitle title="Výsledky" />
              <Divider height="29px" />
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
export default Results;
