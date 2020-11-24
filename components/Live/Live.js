import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LiveNewsItem from "../LiveNewsItem";
import Filler from "../Filler";
import {
  fetchLiveNewsArchive,
  initialize,
  pauseLiveAutofetch,
  startLiveAutofetch,
} from "../../redux/actions/liveActions";

function Live({ startTime, endTime }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.live);
  const { news, isLoading, error, hasMore, hasEnded } = state;
  const ended = hasEnded || (startTime && endTime);

  const fetchMore = () => {
    dispatch(fetchLiveNewsArchive());
  };

  const onBlur = () => {
    dispatch(pauseLiveAutofetch());
  };

  const onFocus = () => {
    dispatch(startLiveAutofetch());
  };

  useEffect(() => {
    dispatch(
      initialize({
        start: startTime,
        end: endTime,
      })
    );

    if (ended) {
      fetchMore();
    } else {
      dispatch(startLiveAutofetch());
      window.addEventListener("blur", onBlur);
      window.addEventListener("focus", onFocus);
    }

    return () => dispatch(pauseLiveAutofetch());
  }, []);

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMore}
      hasMore={hasMore}
      height="100%"
      loader={[0, 1, 2, 3, 4].map((item) => (
        <Filler height="30px" width="100%" />
      ))}
      endMessage={
        <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
          <b>To bola posledná správa.</b>
        </p>
      }
      style={{ padding: "0 10px" }}
    >
      {news.map((item) => (
        <LiveNewsItem key={item.id} post={item} />
      ))}
    </InfiniteScroll>
  );
}

export default Live;
