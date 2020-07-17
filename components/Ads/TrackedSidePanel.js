import React, { Component } from "react";
import SideRePanel from "./SideRePanel/SideRePanel";
import TrackVisibility from "react-on-screen";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

const showGASPercentage = 70; //X% chance to show GAS

export default class TrackedSidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClient: false
    };
  }

  componentDidMount() {
    this.setState({
      onClient: true
    });
  }

  render() {
    if (this.state.onClient) {
      let randomNumber = Math.floor(Math.random() * Math.floor(100));
      if (randomNumber < showGASPercentage) {
        return (
          //google ad if user does not have adblock
          <>
            <AdBlockDetect>
              <TrackVisibility partialVisibility style={{ width: "100%" }}>
                <SideRePanel />
              </TrackVisibility>
            </AdBlockDetect>
            <div style={{ width: "100%", minWidth: "290px", overflow: "hidden" }}>
              <AdSense.Google
                client="ca-pub-2681240380511410"
                slot="9306692655"
                style={{
                  display: "inline-block",
                  width: "100%"
                }}
                layout="in-article"
                format="auto"
              />
            </div>
          </>
        );
      } else {
        return (
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <SideRePanel />
          </TrackVisibility>
        );
      }
    } else return null;
  }
}
