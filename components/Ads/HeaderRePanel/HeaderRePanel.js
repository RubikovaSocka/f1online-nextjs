import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./HeaderRePanel.module.scss";
import Router from "next/router";
import ReactGA from "react-ga";

class HeaderRePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoaded: false,
      renderAds: false
    };
  }

  componentDidMount() {
    this.setState({
      userLoaded: true
    });
    if (!this.props.loaded) {
      this.props.fetchPanels();
    }
  }

  handleClick(link) {
    ReactGA.event({
      category: "partnerClick",
      action: "click-pc-top",
      label: link
    });
  }

  render() {
    const { panelsJSON } = this.props;

    let panelBlock;
    if (this.props.loaded) {
      let partnerPick =
        panelsJSON.bTop[Math.floor(Math.random() * panelsJSON.bTop.length)];
      let panelPick =
        partnerPick.banners[
          Math.floor(Math.random() * partnerPick.banners.length)
        ];
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

    return <div className={styles.container}>{panelBlock}</div>;
  }
}

HeaderRePanel.propTypes = {
  fetchPanels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  panelsJSON: state.panels.data,
  loaded: state.panels.loaded
});

export default connect(
  mapStateToProps,
  { fetchPanels }
)(HeaderRePanel);
