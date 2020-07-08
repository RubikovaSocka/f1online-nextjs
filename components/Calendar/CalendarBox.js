import React, { Component } from "react";
import CalendarItem from "./CalendarItem";
import ArtRePanel from "../Ads/ArtRePanel/ArtRePanel";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";

export default class CalendarBox extends Component {
  render() {
    return (
      <>
        {this.props.data.reverse().map((calendarItem, index) => (
          <>
            <CalendarItem
              key={index}
              position={index}
              data={calendarItem.acf}
            />
            {
             index === 4 && this.props.data.length > 7 ?  <TrackedArtRePanel /> : ""
            }
          </>
        ))}
      </>
    );
  }
}
