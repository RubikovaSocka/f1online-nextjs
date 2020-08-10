import React, { Component } from "react";
import ArtRePanel from "./ArtRePanel/ArtRePanel";
import TrackVisibility from "react-on-screen";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

const showGASPercentage = 65; //X% chance to show GAS

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
      let randomNumber = Math.floor(Math.random() * 100);
      if (
        randomNumber <
        (this.props.GASpercentage
          ? this.props.GASpercentage
          : showGASPercentage)
      ) {
        return (
          //google ad if user does not have adblock
          <>
            <AdBlockDetect>
              <TrackVisibility
                partialVisibility
              >
                <ArtRePanel
                  report={this.props.report}
                  changeable={
                    this.props.changeable
                  }
                />
              </TrackVisibility>
            </AdBlockDetect>
            <div
              style={{
                maxHeight: "160px",
                width: "100%",
                minWidth: "290px",
                overflow: "hidden"
              }}
            >
              <AdSense.Google
                client="ca-pub-2681240380511410"
                slot="7293745168"
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
          <TrackVisibility
            partialVisibility
          >
            <ArtRePanel
              report={this.props.report}
              changeable={this.props.changeable}
            />
          </TrackVisibility>
        );
      }
    } else return null;
  }
}
