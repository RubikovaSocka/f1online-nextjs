import React, { Component } from "react";
import SideRePanel from "./SideRePanel/SideRePanel";
import TrackVisibility from "react-on-screen";

export default class TrackedSidePanel extends Component {
  render() {
    return (
      <TrackVisibility partialVisibility style={{ width: "100%" }}>
        <SideRePanel />
      </TrackVisibility>
    );
  }
}
