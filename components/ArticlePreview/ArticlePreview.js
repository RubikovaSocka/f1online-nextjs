import React from "react";
import Link from "next/link";
import formatDate from "../../utils/dateFormatter.js";
import styles from "./ArticlePreview.module.scss";
import getImagePreview from "../../utils/getImagePreview.js";

export default function ArticlePreview({ id, slug, title, date, better_featured_image }) {
  return (
    <div className={styles.container}>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          <div className={styles.imgContainer}>
            {getImagePreview({
              imgData: better_featured_image,
              imgSize: "medium"
            })}
          </div>
        </a>
      </Link>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a className={`${styles.titleContainer}`}>
          <h3 className={styles.title}>{title.rendered}</h3>
          <span className={styles.date}>{formatDate(date)}</span>
        </a>
      </Link>
    </div>
  );
}
