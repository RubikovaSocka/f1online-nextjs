import React from "react";
import decodeHtml from "../../utils/decodeHtml";
import getImagePreview from "../../utils/getImagePreview";
import formatDate from "../../utils/dateFormatter";
import styles from './PostRendered.module.scss'

function PostTitleArea({ title, authorName, date, imageData }) {
  return (
    <>
      <div className={styles.title}>
        <h1>{decodeHtml(title)}</h1>
      </div>
      <div className={styles.imageContainer}>
        {getImagePreview({
          imgData: imageData,
          imgSize: "medium_large"
        })}
        <span>
          zdroj:{" "}
          {imageData && imageData.caption.length > 0
            ? imageData.caption
            : "F1online.sk"}
        </span>
      </div>
      <div className={styles.authorContainer}>
        <span>{authorName}</span>
        <br />
        <span>{formatDate(date)}</span>
      </div>
    </>
  );
}

export default PostTitleArea;
