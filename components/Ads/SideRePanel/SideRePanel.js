import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./SideRePanel.module.scss";

class SideRePanel extends Component {
  componentDidMount() {
    if (!this.props.loaded) this.props.fetchPanels();
  }
  render() {
    const { panelsJSON } = this.props;

    let panelBlock, panelLink;
    if (this.props.loaded) {
      let partnerPick =
        panelsJSON.partners[
          Math.floor(Math.random() * panelsJSON.partners.length)
        ];
      let panelPick =
        partnerPick.bSide[Math.floor(Math.random() * partnerPick.bSide.length)];
      panelBlock = (
        <a
          href={panelPick.link ? panelPick.link : partnerPick.link}
          rel="noreferrer"
          target="_blank"
        >
          <div className={styles.panel}>
            <img src={panelPick.src} />
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
  loaded: state.panels.loaded
});

export default connect(
  mapStateToProps,
  { fetchPanels }
)(SideRePanel);
