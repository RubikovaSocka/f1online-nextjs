import React from "react";
import EmbedContainer from "react-oembed-container";
import styles from "./PostRendered.module.scss";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";

function InjectAds({ article }) {
  let nrOfParagraphs = (article.match(/<p>/g) || []).length;
  let delimiter = "<p>";
  const nrPsBetween = 4;

  //Don't show ads
  if (nrOfParagraphs < 6) {
    return (
      <div
        className={`${styles.articleContent} ${styles.setFirst}`}
        dangerouslySetInnerHTML={{ __html: article }}
      />
    );
    //Show ads
  } else if (nrOfParagraphs === 6) {
    let counter = 0;
    return (
      <>
        {article.split(delimiter).map((paragraph, index) => {
          counter++;
          return index > 0 ? (
            <div key={counter}>
              <div
                
                className={`${styles.articleContent} ${
                  index === 1 ? styles.firstPar : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: "<p>".concat(paragraph)
                }}
              />
              {index === 3 ? (
                <TrackedArtRePanel report={true} changeable={false} />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          );
        })}
      </>
    );
  } else {
    let counter = 0;
    return (
      <>
        {article.split(delimiter).map((paragraph, index) => {
          counter++;
          return index > 0 ? (
            <div key={counter}>
              <div
                
                className={`${styles.articleContent} ${
                  index === 1 ? styles.firstPar : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: "<p>".concat(paragraph)
                }}
              />
              {(index - 1) % nrPsBetween === 3 &&
              nrOfParagraphs - (index - 1) > 2 ? (
                <TrackedArtRePanel
                  GASpercentage={index > 4 ? 100 : 65}
                  report={index === 4}
                  changeable={index === 4}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          );
        })}
      </>
    );
  }
}

function PostContentArea({ article }) {
  return (
    <EmbedContainer markup={article}>
      <InjectAds article={article} />
    </EmbedContainer>
  );
}

export default PostContentArea;
