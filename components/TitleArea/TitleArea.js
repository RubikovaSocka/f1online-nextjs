import React from "react";
import MainArticlePreview from "../MainArticlePreview/MainArticlePreview";
import TitleArticlePreview from "../TitleArticlePreview/TitleArticlePreview";

import styles from "./TitleArea.module.scss";

function TitleArea({ posts }) {
  if (posts.length === 3) {
    //show for mobile version
    return (
      <div className={styles.container}>
        {posts.map((article, index) => (
          <div key={index}>
            <TitleArticlePreview {...article} />
          </div>
        ))}
      </div>
    );
  } else if (posts.length === 5) {
    //show desktop version
    return (
      <div className={styles.container}>
        <div className={styles.art00}>
          <MainArticlePreview {...posts[0]} />
        </div>
        <div className={styles.art01}>
          <TitleArticlePreview {...posts[1]} />
        </div>
        <div className={styles.art02}>
          <TitleArticlePreview {...posts[3]} />
        </div>
        <div className={styles.art03}>
          <TitleArticlePreview {...posts[2]} />
        </div>
        <div className={styles.art04}>
          <TitleArticlePreview {...posts[4]} />
        </div>
      </div>
    );
  }
  return null;
}

export default TitleArea;
