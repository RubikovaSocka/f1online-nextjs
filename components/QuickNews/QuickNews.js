import React, { useState } from "react";
import styles from "./QuickNews.module.scss";
import formatDate from "../../utils/dateFormatter";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import LoadingSpinner from "../LoadingSpinner";
import EmbedFullscreen from "./EmbedFullscreen.js";
import Popup from "reactjs-popup";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

function OneLineNews({ hasvideo, content, date, embed, callback }) {
  return (
    <div className={styles.newsItemContainer}>
      <p className={styles.date}>{date}</p>
      <div className={`${styles.messageContainer}`}>
        <div
          className={`${styles.message} ${
            hasvideo && hasvideo === "Áno"
              ? `${styles.icon} ${styles.video}`
              : embed.length > 0
              ? `${styles.icon} ${styles.post}`
              : ""
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={callback}
        />
      </div>
    </div>
  );
}

function QuickNews() {
  const [shownItem, setShownItem] = useState({ index: 0, isShown: false });
  const newsArray = useSelector(({ quickNews }) => quickNews.news);
  const isLoaded = useSelector(({ quickNews }) => quickNews.isLoaded);
  const error = useSelector(({ quickNews }) => quickNews.error);

  let newsTriggersArray = newsArray.map((newsItem, index) => (
    <OneLineNews
      key={index}
      id={newsItem.id}
      date={formatDate(newsItem.date)}
      content={newsItem.acf.obsah_rychlej_spravy}
      embed={newsItem.acf.embed_zo_socialnych_sieti}
      hasvideo={newsItem.acf.hasvideo}
      callback={() => setShownItem({ index: index, isShown: true })}
    />
  ));

  return (
    <div className={styles.quicknewsContainer}>
      <SideSectionTitle title="Rýchle správy" />
      {shownItem.isShown ? (
        <Popup
          trigger={""}
          lockScroll
          modal
          open={true}
          closeOnDocumentClick={false}
        >
          {close => (
            <EmbedFullscreen
              {...newsTriggersArray[shownItem.index].props}
              hideClick={close}
              hidePopup={() => setShownItem({ index: 0, isShown: false })}
            />
          )}
        </Popup>
      ) : (
        ""
      )}
      {isLoaded ? (
        <>
          <InfiniteScroll
            dataLength={newsArray.length}
            //next={this.fetchMoreData}
            //hasMore={this.state.hasMore}
            hasMore={false}
            loader={<LoadingSpinner />}
            height={480}
            endMessage={
              <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
                <b>Toto bola posledná rýchla správa.</b>
              </p>
            }
          >
            {newsArray.map((newsItem, index) => (
              <OneLineNews
                key={index}
                id={newsItem.id}
                date={formatDate(newsItem.date)}
                content={newsItem.acf.obsah_rychlej_spravy}
                embed={newsItem.acf.embed_zo_socialnych_sieti}
                hasvideo={newsItem.acf.hasvideo}
                callback={() => {
                  console.log("Pressed");
                  setShownItem({ index: index, isShown: true });
                }}
              />
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default QuickNews;
