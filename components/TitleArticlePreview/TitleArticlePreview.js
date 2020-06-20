import React, { Component } from "react";
import Link from "next/link";
import styles from "./TitleArticlePreview.module.scss";
import getImagePreview from "../../utils/getImagePreview.js";

export default function TitleArticlePreview({
  id,
  slug,
  title,
  better_featured_image
}) {
  return (
    <div className={`${styles.container} zoomImageContainer`}>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a className="noOutline">
          {getImagePreview({
            imgData: better_featured_image,
            imgSize: "medium_large"
          })}
          <div className={`${styles.titleContainer}`}>
            {/*<h3 className={styles.title}>{title.rendered}</h3>*/}
            <h3
              className={`blackBotGradient ${styles.title}`}
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            />
          </div>
        </a>
      </Link>
    </div>
  );
}
