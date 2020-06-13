import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./ArtRePanel.module.scss";
import ReactGA from "react-ga";
import Media from "react-media";
import AdBlockDetect from "react-ad-block-detect";

class ArtRePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningOnClient: false
    };
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchPanels();
    }

    this.setState({
      runningOnClient: true
    });

    (adsbygoogle = window.adsbygoogle || []).push({});
  }

  handleClick(link) {
    ReactGA.event({
      category: "partnerClick",
      action: "click-pc-art",
      label: link
    });
  }

  render() {
    if (this.state.runningOnClient) {
      let panelBlock;
      const { panelsJSON } = this.props;

      if (this.props.loaded) {
        let partnerPick =
          window.innerWidth < 1024
            ? panelsJSON.bArtMob[
                Math.floor(Math.random() * panelsJSON.bArtMob.length)
              ]
            : (partnerPick =
                panelsJSON.bArt[
                  Math.floor(Math.random() * panelsJSON.bArt.length)
                ]);

        let panelPick =
          partnerPick.banners[
            Math.floor(Math.random() * partnerPick.banners.length)
          ];

        let x = Math.floor(Math.random() * 2);
        if (x > 0) {
          panelBlock = (
            <>
              <AdBlockDetect>
                <a
                  href={
                    panelPick.linkTo ? panelPick.linkTo : partnerPick.linkTo
                  }
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
              <ins
                className={`adsbygoogle ${styles.panel}`}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-2681240380511410"
                data-ad-slot="7293745168"
              ></ins>
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
    } else return null;
  }
}

ArtRePanel.propTypes = {
  fetchPanels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  panelsJSON: state.panels.data,
  loaded: state.panels.loaded
});

export default connect(
  mapStateToProps,
  { fetchPanels }
)(ArtRePanel);
