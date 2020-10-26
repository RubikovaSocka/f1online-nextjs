import React from "react";
import ArticlePreview from "../ArticlePreview";

import styles from "./style.module.scss";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";

function ArticlesPanel({ posts }) {
  if (posts.length > 6) {
    return (
      <>
        <div className={styles.container}>
          {posts.slice(0, 6).map((post, index) => (
            <div key={index} className={styles.item}>
              <ArticlePreview {...post} />
            </div>
          ))}
          {/* Fill empty space (on right) in rows with less than 3 posts*/}
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
        </div>
        <div /*counter={counter}*/ style={{ width: "100%" }}>
          <TrackedArtRePanel changeable={true} report={true} />
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
      {posts.map((post, index) => (
        <div key={index} className={styles.item}>
          <ArticlePreview {...post} />
        </div>
      ))}
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
    </div>
  );
}

export default ArticlesPanel;
