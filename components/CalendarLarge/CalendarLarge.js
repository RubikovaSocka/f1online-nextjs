import React, { Component } from "react";
import axios from "axios";
import LinkAsButton from "../LinkAsButton/LinkAsButton";

import styles from "./CalendarLarge.module.scss";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";

import { addMinutes, format, parse } from "date-fns";

function RenderCalendarItem(props) {
  return (
    <div className={styles.timeDataItem}>
      <span className={styles.event}>{props.event}</span>
      <div className={styles.inRow}>
        <span className={styles.time}>{props.time}</span>
        <span className={styles.tvStations}>{props.tv}</span>
      </div>
    </div>
  );
}

class CalendarLarge extends Component {
  state = {
    venueData: {},
    isLoaded: false
  };

  componentDidMount() {
    //axios.get(`/wp-json/wp/v2/calendar/?per_page=1`)
    axios
      .get(`https://wpadmin.f1online.sk/wp-json/wp/v2/calendar?per_page=1`)
      .then(res =>
        this.setState({
          venueData: res.data[0],
          isLoaded: true
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.isLoaded) {
      const { venueData } = this.state;
      return (
        <div>
          <SideSectionTitle title="Najbližšie preteky" />
          <div className={styles.container}>
            <img
              className={styles.image}
              alt="VC Rakúska"
              src="https://wpadmin.f1online.sk/wp-content/uploads/2020/04/bresized003-768x480.jpg"
            />
            <div className={styles.dataContainer}>
              <div className={styles.venueTitleContainer}>
                <p className={styles.venueName}>
                  VC {venueData.acf.venue_name}
                </p>
                <p className={styles.date}>{venueData.acf.venue_date}</p>
              </div>
              <div className={styles.cols}>
                <div className={styles.col1}>
                  <RenderCalendarItem
                    event="1. tréning"
                    time={`${venueData.acf.fp1_time} - ${format(
                      addMinutes(
                        parse(venueData.acf.fp1_time, "HH:mm", new Date()),
                        90
                      ),
                      "HH:mm"
                    )}`}
                    tv={`vysiela${
                      venueData.acf.fp1_tv
                        ? " " + venueData.acf.fp1_tv
                        : ": doplníme..."
                    }`}
                  />
                  <RenderCalendarItem
                    event="2. tréning"
                    time={`${venueData.acf.fp2_time} - ${format(
                      addMinutes(
                        parse(venueData.acf.fp2_time, "HH:mm", new Date()),
                        90
                      ),
                      "HH:mm"
                    )}`}
                    tv={`vysiela${
                      venueData.acf.fp2_tv
                        ? " " + venueData.acf.fp2_tv
                        : ": doplníme..."
                    }`}
                  />
                  <RenderCalendarItem
                    event="3. tréning"
                    time={`${venueData.acf.fp3_time} - ${format(
                      addMinutes(
                        parse(venueData.acf.fp3_time, "HH:mm", new Date()),
                        60
                      ),
                      "HH:mm"
                    )}`}
                    tv={`vysiela${
                      venueData.acf.fp3_tv
                        ? " " + venueData.acf.fp3_tv
                        : ": doplníme..."
                    }`}
                  />
                </div>
                <div className={styles.col2}>
                  <RenderCalendarItem
                    event="Kvalifikácia"
                    time={`${venueData.acf.q_time} - ${format(
                      addMinutes(
                        parse(venueData.acf.q_time, "HH:mm", new Date()),
                        60
                      ),
                      "HH:mm"
                    )}`}
                    tv={`vysiela${
                      venueData.acf.q_tv
                        ? " " + venueData.acf.q_tv
                        : ": doplníme..."
                    }`}
                  />
                  <RenderCalendarItem
                    event="Preteky"
                    time={`${venueData.acf.r_time}`}
                    tv={`vysiela${
                      venueData.acf.r_tv
                        ? " " + venueData.acf.r_tv
                        : ": doplníme..."
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button}>
              <LinkAsButton target={"/kalendar"} title={"Celý kalendár"} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
export default CalendarLarge;
