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
      venueName0: "",
      lastVenueResults0: {},
      lastVenueLoaded0: false,
      driverChampResults0: {},
      driverChampLoaded0: false,
      teamChampResults0: {},
      teamChampLoaded0: false,

      venueName1: "",
      lastVenueResults1: {},
      lastVenueLoaded1: false,
      driverChampResults1: {},
      driverChampLoaded1: false,
      teamChampResults1: {},
      teamChampLoaded1: false
    };
  }

  componentDidMount() {
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/results?per_page=25`)
      .then(res => {
        axios.get(res.data[0].acf.results_json).then(res2 => {
          this.setState({
            lastVenueResults0: res2.data,
            lastVenueLoaded0: true,
            venueName0: res.data[0].acf.venue_name
          });
        });
        axios.get(res.data[0].acf.cd_results_json).then(res => {
          this.setState({
            driverChampResults0: res.data,
            driverChampLoaded0: true
          });
        });
        axios.get(res.data[0].acf.cc_results_json).then(res => {
          this.setState({
            teamChampResults0: res.data,
            teamChampLoaded0: true
          });
        });
        
        if (res.data[1]) {
          axios.get(res.data[1].acf.results_json).then(res2 => {
            this.setState({
              lastVenueResults1: res2.data,
              lastVenueLoaded1: true,
              venueName1: res.data[1].acf.venue_name
            });
          });
          axios.get(res.data[1].acf.cd_results_json).then(res => {
            this.setState({
              driverChampResults1: res.data,
              driverChampLoaded1: true
            });
          });
          axios.get(res.data[1].acf.cc_results_json).then(res => {
            this.setState({
              teamChampResults1: res.data,
              teamChampLoaded1: true
            });
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let contentData;
    if (
      this.state.driverChampLoaded0 &&
      this.state.teamChampLoaded0 &&
      this.state.lastVenueLoaded0
    ) {
      contentData = contentData = (
        <>
          <LastVenueResBox
            venueName={this.state.venueName0}
            data={this.state.lastVenueResults0}
          />
          <DriverChampResBox
            venueName={this.state.venueName0}
            data={this.state.driverChampResults0}
          />
          <TeamChampResBox
            venueName={this.state.venueName0}
            data={this.state.teamChampResults0}
          />
          {this.state.driverChampLoaded1 &&
          this.state.teamChampLoaded1 &&
          this.state.lastVenueLoaded1 ? (
            <>
              <LastVenueResBox
                venueName={this.state.venueName1}
                data={this.state.lastVenueResults1}
              />
              <DriverChampResBox
                venueName={this.state.venueName1}
                data={this.state.driverChampResults1}
              />
              <TeamChampResBox
                venueName={this.state.venueName1}
                data={this.state.teamChampResults1}
              />{" "}
            </>
          ) : (
            ""
          )}
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
