import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./RSpravyPanel.module.scss";
import ReactGA from "react-ga";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

class RSpravyPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleClick(e) {
    ReactGA.event({
      category: "partnerClicked",
      action: "click-pc-rsp",
      label: `${e.link}*${e.src}`
    });
  }

  handleShown(e) {
    ReactGA.event({
      category: "partnerShown",
      action: "click-pc-rsp",
      label: `${e.link}*${e.src}`,
      nonInteraction: true
    });
  }

  pickBanner(nextProps) {
    const { panelsJSON } = nextProps ? nextProps : this.props;
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
    if (!nextProps.loaded) {
      return;
    }
    if (this.state.lastShownSrc === "") {
      this.setState(this.pickBanner(nextProps));
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
      const nextShow = this.pickBanner();
      if (
        nextShow.lastShownSrc != lastShownSrc ||
        nextShow.lastShownLink != lastShownLink
      ) {
        this.setState(nextShow);
      }
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
              this.handleClick({ link: lastShownLink, src: lastShownSrc });
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

const mapStateToProps = ({panels}) => ({
  json: panels.json
});

const mapDispatchToProps = dispatch => ({
  fetchPanels: () => dispatch(fetchPanels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RSpravyPanel);
