import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPanels } from "../../../redux/actions/panelsActions";
import styles from "./HeaderRePanel.module.scss";

class HeaderRePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  componentDidMount() {
    if (!this.props.loaded) this.props.fetchPanels();
    /* TODO WHEN MULTIPLE BANNERS
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      30000
    );*/
  }

  render() {
    const { panelsJSON } = this.props;

    let panelBlock;
    if (this.props.loaded) {
      let partnerPick =
        panelsJSON.partners[
          Math.floor(Math.random() * panelsJSON.partners.length)
        ];
      let panelPick =
        partnerPick.bTop[Math.floor(Math.random() * partnerPick.bTop.length)];
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
