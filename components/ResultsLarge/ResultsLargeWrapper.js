import React, { Component } from "react";
import axios from "axios";
import ResultsLarge from "./ResultsLarge";

const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "673px"
};

export class ResultsLargeWrapper extends Component {
  state = {
    lastVenueName: "",
    lastVenueDriverData: {},
    lastVenueDriverChampData: {},
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/results?per_page=1`)
      .then(res => {
        const venueName = res.data[0].acf.venue_name;
        const venue = axios.get(res.data[0].acf.results_json);

        const champ = axios.get(res.data[0].acf.cd_results_json);

        Promise.all([venue, champ]).then(res => {
          this.setState({
            lastVenueName: venueName,
            lastVenueData: res[0].data,
            lastVenueDriverChampData: res[1].data,
            isLoaded: true
          });
        });
      })
      .catch(err => console.log(err));
    /*this.setState({
      isLoaded: true
    });*/
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div style={styles}>
          <ResultsLarge
            venueName={this.state.lastVenueName}
            data={this.state.lastVenueData}
            renderID="gp"
          />
          <ResultsLarge
            venueName={this.state.lastVenueName}
            data={this.state.lastVenueDriverChampData}
            renderID="champ"
          />
        </div>
      );
    }
    return null;
  }
}

export default ResultsLargeWrapper;
