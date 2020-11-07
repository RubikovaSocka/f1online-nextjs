import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./HeaderRePanel.module.scss";
import ReactGA from "react-ga";

class HeaderRePanel extends Component {
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
    this.props.fetchPanels();
    this.setState({
      runningOnClient: true
    });
  }

  handleClick(e) {
    ReactGA.event({
      category: "partnerClicked",
      action: "click-pc-top",
      label: `${e.link}*${e.src}`
    });
  }

  handleShown(e) {
    ReactGA.event({
      category: "partnerShown",
      action: "click-pc-top",
      label: `${e.link}*${e.src}`,
      nonInteraction: true
    });
  }

  pickBanner(nextProps) {
    const { panels } = nextProps ? nextProps : this.props;
    let partnerPick =
      panels.bTop[Math.floor(Math.random() * panels.bTop.length)];
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
    if (Object.keys(nextProps.panels).length === 0) {
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
    const { panels } = this.props;
    if (Object.keys(panels).length > 0) {
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

const mapStateToProps = ({ panels }) => ({
  panels: panels.json,
  loaded: panels.loaded
});

const mapDispatchToProps = dispatch => ({
  fetchPanels: () => dispatch(fetchPanels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderRePanel);
