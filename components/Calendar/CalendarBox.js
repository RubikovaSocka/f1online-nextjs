import React, { Component } from "react";
import CalendarItem from "./CalendarItem";

export default class CalendarBox extends Component {
  render() {
    return (
      <>
        {this.props.data.reverse().map((calendarItem, index) => (
          <CalendarItem key={index} position={index} data={calendarItem.acf} />
        ))}
      </>
    );
  }
}
