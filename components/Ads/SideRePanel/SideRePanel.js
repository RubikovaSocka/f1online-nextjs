import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./SideRePanel.module.scss";
import ReactGA from "react-ga";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

class SideRePanel extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchPanels();
    }
    //let adsbygoogle;
    //(adsbygoogle = window.adsbygoogle || []).push({});
  }

  handleClick(link) {
    ReactGA.event({
      category: "partnerClick",
      action: "click-pc-side",
      label: link
    });
  }

  render() {
    const { panelsJSON } = this.props;

    let panelBlock;
    if (this.props.loaded) {
      let partnerPick =
        panelsJSON.bSide[Math.floor(Math.random() * panelsJSON.bSide.length)];
      let panelPick =
        partnerPick.banners[
          Math.floor(Math.random() * partnerPick.banners.length)
        ];
      let x = Math.floor(Math.random() * 3);
      if (x > 0) {
        panelBlock = (
          <>
            <AdBlockDetect>
              <a
                href={panelPick.linkTo ? panelPick.linkTo : partnerPick.linkTo}
                rel="noreferrer"
                target="_blank"
                onClick={() => {
                  this.handleClick(panelPick.linkTo);
                }}
              >
                <div className={styles.panel}>
                  <img src={panelPick.imgSrc} />
                </div>
              </a>
            </AdBlockDetect>
{/*
            <ins
              className={`adsbygoogle ${styles.container}`}
              data-ad-client="ca-pub-2681240380511410"
              data-ad-slot="9306692655"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>*/}
            <div className={styles.panel}>
                <AdSense.Google
                  client="ca-pub-2681240380511410"
                  slot="9306692655"
                  style={{ display: "inline-block", width: "300px", height: "250px"}}
                  layout="in-article"
                  format="auto"
                />
              </div>
          </>
        );
      } else {
        panelBlock = (
          <a
            href={panelPick.linkTo ? panelPick.linkTo : partnerPick.linkTo}
            rel="noreferrer"
            target="_blank"
            onClick={() => {
              this.handleClick(panelPick.linkTo);
            }}
          >
            <div className={styles.panel}>
              <img src={panelPick.imgSrc} />
            </div>
          </a>
        );
      }
    }

    return <div className={styles.container}>{panelBlock}</div>;
  }
}

SideRePanel.propTypes = {
  fetchPanels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  panelsJSON: state.panels.data,
  loaded: state.panels.loaded,
  userLoaded: true
});

export default connect(
  mapStateToProps,
  { fetchPanels }
)(SideRePanel);
