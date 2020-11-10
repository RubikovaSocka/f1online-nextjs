import { useState } from "react";
import Loadable from "react-loadable";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import OneLineNewsItem from "./OneLineNewsItem";

import { Item, Container, LoaderPanel } from "./StyledComponents";
import { fetchMoreQuickNews } from "../../redux/actions/quickNewsActions";
import formatDate from "../../utils/dateFormatter";

const EmbedFullscreen = Loadable({
  loader: () => import("./EmbedFullscreen.js"),
  loading: "true"
});
const Popup = Loadable({
  loader: () => import("reactjs-popup"),
  loading: "true"
});

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
