import React, { useState } from "react";
import formatDate from "../../utils/dateFormatter";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
//import EmbedFullscreen from "./EmbedFullscreen.js";
import Popup from "reactjs-popup";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoreQuickNews } from "../../redux/actions/quickNewsActions";

import OneLineNewsItem from "./OneLineNewsItem";

import styled from "styled-components";

import dynamic from "next/dynamic";
const EmbedFullscreen = dynamic(() => import('./EmbedFullscreen.js'))

const Container = styled.div`
  margin-bottom: 25px;
`;

function QuickNews() {
  const dispatch = useDispatch();
  const [shownItem, setShownItem] = useState({ index: 0, isShown: false });
  const newsArray = useSelector(({ quickNews }) => quickNews.news);
  //const isLoading = useSelector(({ quickNews }) => quickNews.isLoading);
  const error = useSelector(({ quickNews }) => quickNews.error);
  const totalNewsCount = useSelector(
    ({ quickNews }) => quickNews.totalNewsCount
  );

  let newsTriggersArray = newsArray.map((newsItem, index) => (
    <OneLineNewsItem
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
    <Container>
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
      <InfiniteScroll
        dataLength={newsArray.length}
        next={() => dispatch(fetchMoreQuickNews())}
        hasMore={totalNewsCount > newsArray.length}
        loader={<LoadingSpinner />}
        height={480}
        endMessage={
          <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
            <b>Toto bola posledná rýchla správa.</b>
          </p>
        }
      >
        {newsArray.map((newsItem, index) => (
          <OneLineNewsItem
            key={index}
            id={newsItem.id}
            date={formatDate(newsItem.date)}
            content={newsItem.acf.obsah_rychlej_spravy}
            embed={newsItem.acf.embed_zo_socialnych_sieti}
            hasvideo={newsItem.acf.hasvideo}
            callback={() => {
              setShownItem({ index: index, isShown: true });
            }}
          />
        ))}
      </InfiniteScroll>
    </Container>
  );
}

export default QuickNews;
