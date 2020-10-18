import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./ArtRePanel.module.scss";
import ReactGA from "react-ga";
import Media from "react-media";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

class ArtRePanel extends Component {
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
    this.props.fetchPanels();
  }

  pickBanner(nextProps) {
    const { panelsJSON } = nextProps ? nextProps : this.props;
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

    return {
      lastShownSrc: panelPick.imgSrc,
      lastShownLink: panelPick.linkTo
    };
  }

  handleClick(e) {
    ReactGA.event({
      category: "partnerClicked",
      action: "click-pc-art",
      label: `${e.link}*${e.src}`
    });
  }

  handleShown(e) {
    if (this.props.report) {
      ReactGA.event({
        category: "partnerShown",
        action: "shown-pc-art",
        label: `${e.link}*${e.src}`,
        nonInteraction: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("ss " + this.props.changeable)
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
    } else if (this.props.changeable) {
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
    const { lastShownSrc, lastShownLink } = this.state;

    if (this.props.loaded) {
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
)(ArtRePanel);
