import formatDate from "../../utils/dateFormatter.js";
import EmbedContainer from "react-oembed-container";
import styles from "./PostItem.module.scss";

function PostItem({ post }) {
  const { date, acf } = post;
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.postTime}>
          <span>{formatDate(date)}</span>
        </div>
        <div className={`${styles.postTextContent} ${styles.text}`}>
          {acf.sprava}
        </div>
      </div>
      {acf.embed ? (
        <EmbedContainer markup={acf.embed} className={styles.embed}>
          <div
            dangerouslySetInnerHTML={{
              __html: acf.embed
            }}
          />
        </EmbedContainer>
      ) : (
        ""
      )}
      {acf.foto ? <img className={styles.img} src={acf.foto}></img> : ""}
    </div>
  );
}

export default PostItem;
