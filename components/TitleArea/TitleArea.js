import React, { Component } from "react";
import axios from 'axios';
import MainArticlePreview from "../MainArticlePreview/MainArticlePreview";
import TitleArticlePreview from "../TitleArticlePreview/TitleArticlePreview";

import styles from "./TitleArea.module.scss";

class TitleArea extends Component {

  componentDidMount() {
    console.log(`https://forum.f1online.sk/t/${this.props.posts[0].slug}-f1online-sk.json`)
    axios.get(`https://forum.f1online.sk/t/${this.props.posts[0].slug}-f1online-sk.json`)
      .then(res => {
        console.log(res)
        console.log(res.posts_count)
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    if (this.props.posts.length === 3) {
      //show for mobile version
      return (
        <div className={styles.container}>
          {this.props.posts.map((article, index) => (
            <div key={index}>
              <TitleArticlePreview {...article} />
            </div>
          ))}
        </div>
      );
    } else if (this.props.posts.length === 5) {
      //show desktop version
      return (
        <div className={styles.container}>
          <div className={styles.art00}>
            <MainArticlePreview {...this.props.posts[0]} />
          </div>
          <div className={styles.art01}>
            <TitleArticlePreview {...this.props.posts[1]} />
          </div>
          <div className={styles.art02}>
            <TitleArticlePreview {...this.props.posts[3]} />
          </div>
          <div className={styles.art03}>
            <TitleArticlePreview {...this.props.posts[2]} />
          </div>
          <div className={styles.art04}>
            <TitleArticlePreview {...this.props.posts[4]} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default TitleArea;
