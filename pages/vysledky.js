import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import { connect } from "react-redux";
import QuickNews from "../components/QuickNews/QuickNews.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import Divider from "../components/Divider.js";
import LastVenueResBox from "../components/Results/LastVenueResBox.js";
import DriverChampResBox from "../components/Results/DriverChampResBox.js";
import TeamChampResBox from "../components/Results/TeamChampResBox.js";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import { fetchProgramme } from "../redux/actions/programmeActions";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR
} from "../components/PageLayout";

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
      teamChampLoaded1: false,

      venueName2: "",
      lastVenueResults2: {},
      lastVenueLoaded2: false,
      driverChampResults2: {},
      driverChampLoaded2: false,
      teamChampResults2: {},
      teamChampLoaded2: false
    };
  }

  componentDidMount() {
    this.props.initialize();
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/results?per_page=5`)
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
        } /*
        if (res.data[2]) {
          axios.get(res.data[2].acf.results_json).then(res3 => {
            this.setState({
              lastVenueResults2: res3.data,
              lastVenueLoaded2: true,
              venueName2: res.data[2].acf.venue_name
            });
          });
          axios.get(res.data[2].acf.cd_results_json).then(res => {
            this.setState({
              driverChampResults2: res.data,
              driverChampLoaded2: true
            });
          });
          axios.get(res.data[2].acf.cc_results_json).then(res => {
            this.setState({
              teamChampResults2: res.data,
              teamChampLoaded2: true
            });
          });
        }*/
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
          {/*this.state.driverChampLoaded2 &&
          this.state.teamChampLoaded2 &&
          this.state.lastVenueLoaded2 ? (
            <>
              <LastVenueResBox
                venueName={this.state.venueName2}
                data={this.state.lastVenueResults2}
              />
              <DriverChampResBox
                venueName={this.state.venueName2}
                data={this.state.driverChampResults2}
              />
              <TeamChampResBox
                venueName={this.state.venueName2}
                data={this.state.teamChampResults2}
              />{" "}
            </>
          ) : (
            ""
          )*/}
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
        <MAIN>
          <COLUMNED_PAGE>
            <PAGE_MAIN_COL>
              <SectionTitle title="Výsledky" />
              <Divider height="29px" />
              {contentData}
            </PAGE_MAIN_COL>
            <SIDEBAR>
              <Divider height="50px" />
              <QuickNews />
            </SIDEBAR>
          </COLUMNED_PAGE>
        </MAIN>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initialize: () => {
    dispatch(fetchNewQuickNews());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Results);

/*
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(END);
  }
);*/
