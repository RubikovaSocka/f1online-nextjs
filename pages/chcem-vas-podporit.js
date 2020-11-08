import React, { Component } from "react";
import axios from "axios";
import styles from "../styles/chcemVasPodporit.module.scss";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR
} from "../components/PageLayout";

export default class chcemVasPodporit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      articleContent: {}
    };
  }

  componentDidMount() {
    axios
      .get("https://wpadmin.f1online.sk/wp-content/uploads/donate.json")
      .then(res => {
        this.setState({
          loaded: true,
          articleContent: res.data.content
        });
      });
  }

  render() {
    return (
      <MAIN>
        <div className={styles.fullpage}>
          {this.state.loaded ? (
            <div
              className={styles.message}
              dangerouslySetInnerHTML={{ __html: this.state.articleContent }}
            />
          ) : (
            ""
          )}

          <div className={styles.donateButtonContainer}>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_blank"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="hosted_button_id"
                value="JKBMX6G3DWTRQ"
              />
              <input
                className={styles.donateImage}
                type="image"
                src="/images/donate-button.png"
                border="0"
                name="submit"
                title="Podporiť F1online.sk cez PayPal alebo kreditnú kartu"
                alt="Donate with PayPal button"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypal.com/en_SK/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </div>
        </div>
      </MAIN>
    );
  }
}
