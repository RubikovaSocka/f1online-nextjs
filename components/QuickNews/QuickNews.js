import React, { useState } from "react";
import formatDate from "../../utils/dateFormatter";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
//import EmbedFullscreen from "./EmbedFullscreen.js";
import Popup from "reactjs-popup";
import TemporaryInfoPanel from "../TemporaryInfoPanel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoreQuickNews } from "../../redux/actions/quickNewsActions";

import OneLineNewsItem from "./OneLineNewsItem";

import styled from "styled-components";

import dynamic from "next/dynamic";
const EmbedFullscreen = dynamic(() => import("./EmbedFullscreen.js"));

const Container = styled.div`
  margin-bottom: 25px;
`;

const Item = styled.div`
  background-color: ${props => props.theme.FILLER_COLOR};
  overflow: hidden;
  position: relative;
  margin: 10px 0;
  height: 82px;
  width: 100%;

  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  :after {
    content: "";
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: slide 1s infinite;
    animation-delay: ${props => props.delay};
    background: ${props => props.theme.FILLER_SHINE_GRADIENT};
  }
`;

const LoaderPanel = styled.div`
  width: 93%;
  margin: auto;
`;

function QuickNews() {
  const dispatch = useDispatch();
  const [shownItem, setShownItem] = useState({ index: 0, isShown: false });
  const state = useSelector(state => state.quickNews);
  const { news, error, /*isLoading,*/ totalNewsCount } = state;
  const isLoading = true;
  let newsTriggersArray = news.map((newsItem, index) => (
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
        dataLength={news.length}
        next={() => dispatch(fetchMoreQuickNews())}
        hasMore={isLoading || totalNewsCount > news.length}
        loader={
          <LoaderPanel loader width="286px" height="440px" margin="20px auto">
            <Item delay="0" className="shine" />
            <Item delay="0.1s" className="shine" />
            <Item delay="0.2s" className="shine" />
            <Item delay="0.3s" className="shine" />
            <Item delay="0.4s" className="shine" />
          </LoaderPanel>
        }
        height={480}
        endMessage={
          <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
            <b>Toto bola posledná rýchla správa.</b>
          </p>
        }
      >
        {news.map((newsItem, index) => (
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
