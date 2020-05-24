import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./SideRePanel.module.scss";
import ReactGA from "react-ga";

class SideRePanel extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchPanels();
    }
  }

  handleClick(link) {
    console.log("clicked " + link);
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
