import { useState } from "react";
import Loadable from "react-loadable";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import OneLineNewsItem from "./OneLineNewsItem";
import LinkAsButton from "../LinkAsButton/LinkAsButton";

import { Item, Container, LoaderPanel } from "./StyledComponents";
import { fetchQuickNewsArchive } from "../../redux/actions/quickNewsActions";
import formatDate from "../../utils/dateFormatter";
import Filler from "../Filler";

const EmbedFullscreen = Loadable({
  loader: () => import("./EmbedFullscreen.js"),
  loading: () => <Filler height="300px" width="100%" />,
});
const Popup = Loadable({
  loader: () => import("reactjs-popup"),
  loading: () => <Filler height="300px" width="100%" />,
});

function QuickNews() {
  const dispatch = useDispatch();
  const [shownItem, setShownItem] = useState({ index: 0, isShown: false });
  const state = useSelector((state) => state.quickNews);
  const { news, error, isLoading, totalNewsCount } = state;

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
          {(close) => (
            <EmbedFullscreen
              //{...newsTriggersArray[shownItem.index].props}
              id={news[shownItem.index].id}
              date={formatDate(news[shownItem.index].date)}
              content={news[shownItem.index].acf.obsah_rychlej_spravy}
              embed={news[shownItem.index].acf.embed_zo_socialnych_sieti}
              image={news[shownItem.index].acf.image}
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
        next={() => dispatch(fetchQuickNewsArchive())}
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
            hasVideo={newsItem.acf.hasvideo && newsItem.acf.hasvideo === "Áno"}
            hasAttachment={
              (newsItem.acf.embed_zo_socialnych_sieti &&
                newsItem.acf.embed_zo_socialnych_sieti.length > 0) ||
              newsItem.acf.image
            }
            callback={() => {
              setShownItem({ index: index, isShown: true });
            }}
          />
        ))}
      </InfiniteScroll>
      <div
        style={{
          height: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <LinkAsButton
          target={"/rychle-spravy"}
          title={"Otvoriť všetky rýchle správy"}
        />
      </div>
    </Container>
  );
}

export default QuickNews;
