import React, { Component } from "react";
import RSpravyPanel from "./RSpravyPanel/RSpravyPanel";
import TrackVisibility from "react-on-screen";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

const showGASPercentage = 85; //X% chance to show GAS

export default class TrackedRSpravyPanel extends Component {
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
      let randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < showGASPercentage) {
        return (
          //google ad if user does not have adblock
          <>
            <AdBlockDetect>
              <TrackVisibility partialVisibility style={{ height: "100%", width: "100%" }}>
                <RSpravyPanel />
              </TrackVisibility>
            </AdBlockDetect>
            <div style={{ height: "100%", width: "100%", minWidth: "290px", overflow: "hidden" }}>
              <AdSense.Google
                client="ca-pub-2681240380511410"
                slot="3932644685"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%"
                }}
                layout="in-article"
                format=""
              />
            </div>
          </>
        );
      } else {
        return (
          <TrackVisibility partialVisibility style={{ height: "100%", width: "100%" }}>
            <RSpravyPanel />
          </TrackVisibility>
        );
      }
    } else return null;
  }
}
