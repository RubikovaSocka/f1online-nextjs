import React, { Component } from "react";
import TrackVisibility from "react-on-screen";
import ArtRePanel from "./ArtRePanel/ArtRePanel";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

const showGASPercentage = 70; //X% chance to show GAS

export default class TrackedArtRePanel extends Component {
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
              <TrackVisibility partialVisibility>
                <ArtRePanel />
              </TrackVisibility>
            </AdBlockDetect>
            <div style={{ width: "100%", minWidth: "280px", overflow: "hidden" }}>
              <AdSense.Google
                client="ca-pub-2681240380511410"
                slot="7293745168"
                style={{
                  display: "inline-block",
                  width: "100%"
                }}
                layout="in-article"
                format="fluid"
              />
            </div>
          </>
        );
      } else {
        return (
          <TrackVisibility partialVisibility>
            <ArtRePanel />
          </TrackVisibility>
        );
      }
    } else return null;
  }
}
