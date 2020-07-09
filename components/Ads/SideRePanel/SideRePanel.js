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
    this.state = {
      runningOnClient: true,
      alreadyShown: [],
      lastShownLink: "",
      lastShownSrc: ""
    };

    this.pickBanner = this.pickBanner.bind(this);
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchPanels();
    }

    this.setState({
      runningOnClient: true
    });
  }

  handleClick(e) {
    ReactGA.event({
      category: "partnerClicked",
      action: "click-pc-side",
      label: `${e.link}*${e.src}`,
    });
  }

  handleShown(e) {
    ReactGA.event({
      category: "partnerShown",
      action: "click-pc-side",
      label: `${e.link}*${e.src}`,
      nonInteraction: true
    });
  }

  pickBanner() {
    const { panelsJSON } = this.props;
    let partnerPick =
      panelsJSON.bSide[Math.floor(Math.random() * panelsJSON.bSide.length)];
    let panelPick =
      partnerPick.banners[
        Math.floor(Math.random() * partnerPick.banners.length)
      ];

    return {
      lastShownSrc: panelPick.imgSrc,
      lastShownLink: panelPick.linkTo
    };
  }

  componentWillReceiveProps(nextProps) {
    const { lastShownSrc, lastShownLink } = this.state;
    if (!this.props.loaded) {
      return;
    }
    if (this.state.lastShownSrc === "") {
      this.setState(this.pickBanner());
      return;
    }

    if (nextProps.isVisible) {
      if (!this.state.alreadyShown.includes(lastShownSrc)) {
        this.handleShown({ link: lastShownLink, src: lastShownSrc });
        this.setState(prev => {
          return {
            alreadyShown: prev.alreadyShown.concat(lastShownSrc)
          };
        });
      }
    } else {
      this.setState(this.pickBanner());
    }
  }

  render() {
    if (this.props.loaded) {
      const { lastShownSrc, lastShownLink } = this.state;
      return (
        <div className={styles.container}>
          <a
            href={lastShownLink}
            rel="noreferrer"
            target="_blank"
            onClick={() => {
              this.handleClick(panelPick.linkTo);
            }}
          >
            <div className={styles.panel}>
              <img src={lastShownSrc} />
            </div>
          </a>
        </div>
      );
    } else return null;
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
