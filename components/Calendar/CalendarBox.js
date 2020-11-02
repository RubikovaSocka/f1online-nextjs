import React from "react";
import CalendarItem from "./CalendarItem";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";

function CalendarBox({ data }) {
  return data.map((calendarItem, index) => (
    <>
      <CalendarItem key={index} position={index} {...calendarItem} />
      {index === 4 && data.length > 7 ? (
        <TrackedArtRePanel report={true} changeable={true} />
      ) : (
        ""
      )}
    </>
  ));
}

export default CalendarBox;
