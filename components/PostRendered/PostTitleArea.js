import React from "react";
import decodeHtml from "../../utils/decodeHtml";
import getImagePreview from "../../utils/getImagePreview";
import formatDate from "../../utils/dateFormatter";
import styles from './PostRendered.module.scss'

function PostTitleArea({ title, authorName, date, imageData, id, slug }) {
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
      <div className={styles.shareButtonRow}>
        <iframe
          src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(
            `https://f1online.sk/clanky/${id}/${slug}`
          )}&width=128&layout=button_count&action=like&size=small&share=true&height=46&appId=313229599518550`}
          width="183"
          height="25"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </>
  );
}

export default PostTitleArea;
