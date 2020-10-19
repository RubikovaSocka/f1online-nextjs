import React from "react";
import styles from "./style.module.scss";

function SocialMediaBasicPlugin() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <a
          className="noOutline"
          href="https://www.facebook.com/f1online.sk/"
          rel="noreferrer"
          target="_blank"
        >
          <img alt="." className={styles.fbImg} />
        </a>
      </div>

      <div className={styles.item}>
        <a
          href="https://www.instagram.com/stevoeiselef1/"
          rel="noreferrer"
          target="_blank"
          className="noOutline"
        >
          <img alt="." className={styles.instaImg} />
        </a>
      </div>
      <div className={styles.item}>
        <a
          href="https://www.youtube.com/channel/UCE54uS8jp-tlGC7wjUhnt4A"
          rel="noreferrer"
          target="_blank"
          className="noOutline"
        >
          <img alt="." className={styles.youtubeImg} />
        </a>
      </div>
    </div>
  );
}

export default SocialMediaBasicPlugin;
