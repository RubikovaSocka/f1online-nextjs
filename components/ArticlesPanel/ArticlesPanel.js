import React, { Component } from "react";
import ArticlePreview from "../ArticlePreview/ArticlePreview";

import styles from "./ArticlesPanel.module.scss";
import ArtRePanel from "../Ads/ArtRePanel/ArtRePanel";
import TrackVisibility from "react-on-screen";

class ArticlesPanel extends Component {
  render() {
    const { posts } = this.props;
    if (posts.length > 6) {
      return (
        <>
          <div className={styles.container}>
            {posts.slice(0, 6).map((post, index) => (
              <div key={index} className={styles.item}>
                <ArticlePreview {...post} />
              </div>
            ))}
            <i aria-hidden="true"></i>
            <i aria-hidden="true"></i>
          </div>
          <div counter={this.props.counter}>
            <TrackVisibility partialVisibility>
              <ArtRePanel />
            </TrackVisibility>
          </div>

          <div className={styles.container}>
            {posts.slice(6, 12).map((post, index) => (
              <div key={index} className={styles.item}>
                <ArticlePreview {...post} />
              </div>
            ))}
            <i aria-hidden="true"></i>
            <i aria-hidden="true"></i>
          </div>
        </>
      );
    }
    return (
      <div className={styles.container}>
        {this.props.posts.map((post, index) => (
          <div key={index} className={styles.item}>
            <ArticlePreview {...post} />
          </div>
        ))}
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>
      </div>
    );
  }
}
export default ArticlesPanel;
