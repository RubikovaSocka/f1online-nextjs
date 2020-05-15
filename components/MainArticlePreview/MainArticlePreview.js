import React, { Component } from "react";
import Link from "next/link";
import styles from "./MainArticlePreview.module.scss";
import getImagePreview from "../../utils/getImagePreview.js";

export default function MainArticlePreview({ id, slug, better_featured_image, title }) {
  return (
    <div className={`${styles.container} zoomImageContainer`}>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          {getImagePreview({
            imgData: better_featured_image,
            imgSize: "medium_large"
          })}
          <div className={`${styles.titleContainer} blackBotGradient`}>
            <div className={styles.title}>{title.rendered}</div>
          </div>
        </a>
      </Link>
    </div>
  );
}
