import React, { Component } from "react";
import axios from "axios";

import LastVenueWidget from "./LastVenueWidget/LastVenueWidget";
import ChampResWidget from "./ChampResWidget/ChampResWidget";
import CalendarWidgetContent from "./CalendarWidget/CalendarWidget";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import SideWidgetButton from "./SideWidgetButton/SideWidgetButton";

import styles from "./CalResWidget.module.scss";

class CalResWidget extends Component {
  constructor() {
    super();
    this.state = {
      pickedWidget: "CAL",
      calendarData: {},
      lastVenueName: "",
      lastVenueData: {},
      champData: {},

      calendarIsLoaded: false,
      //lastVenueIsLoaded: false,
      //champIsLoaded: false
      lastVenueIsLoaded: true,
      champIsLoaded: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderElement = this.renderElement.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/calendar?per_page=1`)
      .then(res => {
        this.setState({
          calendarData: res.data[0],
          calendarIsLoaded: true
        });
      });
    //.catch(err => console.log(err))
/*
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/results?per_page=1`)
      .then(res => {
        const venueName = res.data[0].acf.venue_name;
        const venue = axios.get(res.data[0].acf.results_json);
        const champ = axios.get(res.data[0].acf.cd_results_json);
        Promise.all([venue, champ]).then(res => {
          this.setState({
            lastVenueName: venueName,
            lastVenueData: res[0].data.MRData,
            lastVenueConstructorData: res[1].data.MRData,
            lastVenueIsLoaded: true,
            champIsLoaded: true
          });
        });
      })
      .catch(err => console.log(err));*/
  }

  handleChange(id) {
    this.setState(prevState => {
      return {
        pickedWidget: id
      };
    });
  }

  renderElement() {
    if (this.state.pickedWidget === "CAL") {
      if (this.state.calendarIsLoaded) {
        return <CalendarWidgetContent data={this.state.calendarData} />;
      }
    }
    if (this.state.pickedWidget === "LRES") {
      if (this.state.lastVenueIsLoaded) {
        return (
          <LastVenueWidget
            venueName={this.state.lastVenueName}
            data={this.state.lastVenueData}
          />
        );
      }
    }
    if (this.state.pickedWidget === "CRES") {
      if (this.state.champIsLoaded) {
        return (
          <ChampResWidget
            venueName={this.state.lastVenueName}
            data={this.state.lastVenueConstructorData}
          />
        );
      }
    }
    return null;
  }

  render() {
    return (
      <div className={styles.widget}>
        <SideSectionTitle title="Boxová tabuľa" />
        <div className={styles.widgetContent}>
          <div className={styles.widgetButtonsContainer}>
            <SideWidgetButton
              title="Budúca VC"
              onClick={() => this.handleChange("CAL")}
              selected={this.state.pickedWidget === "CAL" ? true : false}
            />
            <SideWidgetButton
              title="Posledná VC"
              onClick={() => this.handleChange("LRES")}
              selected={this.state.pickedWidget === "LRES" ? true : false}
            />
            <SideWidgetButton
              title="Šampionát"
              onClick={() => this.handleChange("CRES")}
              selected={this.state.pickedWidget === "CRES" ? true : false}
            />
          </div>
          <div className={styles.content}>{<this.renderElement />}</div>
        </div>
      </div>
    );
  }
}
export default CalResWidget;
