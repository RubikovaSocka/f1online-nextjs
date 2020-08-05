import React, { Component } from "react";
import EmbedContainer from "react-oembed-container";
import styles from "./EmbedFullscreen.module.scss";
import TrackedRSpravyPanel from "../Ads/TrackedRSpravyPanel";
import ReactGA from "react-ga";
import Media from "react-media";
import AdSense from "react-adsense";

export default class EmbedFullscreen extends Component {
  componentDidMount() {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
    ReactGA.pageview(`https://f1online.sk/rychle-spravy/${this.props.id}`);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={`${styles.content} ${this.props.embed.length === 0 ? styles.textOnlyContent : ""}`}>
          <div
            className={styles.message}
            dangerouslySetInnerHTML={{
              __html: this.props.date.concat("").concat(this.props.content)
            }}
          />

          <EmbedContainer className={styles.embed} markup={this.props.embed}>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.embed
              }}
            ></div>
          </EmbedContainer>
        </div>
        <div className={`${styles.rPanel} ${this.props.embed.length === 0 ? styles.textOnlyPanel : ""}`}>
          <Media query={{ maxWidth: 1023 }}>
            {matches =>
              matches ? (
                <AdSense.Google
                client="ca-pub-2681240380511410"
                slot="3863813186"
                style={{
                  //display: "inline-block",
                  float: "left",
                  width: "100%",
                  height: "100%"
                }}
                //layout="in-article"
                format=""
              />
              ) : (
                <TrackedRSpravyPanel />
              )
            }
          </Media>
          
        </div>

        <button className={styles.closeButton} onClick={() => {this.props.hideClick(); this.props.hidePopup()}}>
          <span>Zavrieť</span>&times;
        </button>
      </div>
    );
  }
}
