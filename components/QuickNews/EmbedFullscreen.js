import React, { useEffect } from "react";
import EmbedContainer from "react-oembed-container";
import styles from "./EmbedFullscreen.module.scss";
import TrackedRSpravyPanel from "../Ads/TrackedRSpravyPanel";
import ReactGA from "react-ga";
import Media from "react-media";
import AdSense from "react-adsense";

export default function EmbedFullscreen({
  id,
  date,
  embed,
  content,
  hideClick,
  hidePopup
}) {
  useEffect(() => {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
    ReactGA.pageview(`/rychle-spravy/${id}`);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${
          embed.length === 0 ? styles.textOnlyContent : ""
        }`}
      >
        <div
          className={styles.message}
          dangerouslySetInnerHTML={{
            __html: date.concat("").concat(content)
          }}
        />

        <EmbedContainer className={styles.embed} markup={embed}>
          <div
            dangerouslySetInnerHTML={{
              __html: embed
            }}
          ></div>
        </EmbedContainer>
      </div>
      <div
        className={`${styles.rPanel} ${
          embed.length === 0 ? styles.textOnlyPanel : ""
        }`}
      >
        <Media query={{ maxWidth: 1023 }}>
          {matches =>
            matches ? (
              <AdSense.Google
                client="ca-pub-2681240380511410"
                slot="3863813186"
                style={{
                  display: "inline-block",
                  //float: "left",
                  width: "100%",
                  height: "100%"
                }}
                layout="in-article"
                format=""
              />
            ) : (
              <TrackedRSpravyPanel />
            )
          }
        </Media>
      </div>

      <button
        className={styles.closeButton}
        onClick={() => {
          hideClick();
          hidePopup();
        }}
      >
        <span>Zavrieť</span>&times;
      </button>
    </div>
  );
}
