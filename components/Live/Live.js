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
import Divider from "../Divider";

const Loader = () => {
  return [0, 1, 2, 3, 4].map((item) => <Filler height="30px" width="100%" />);
};

function Live({ isVisible, startTime, endTime }) {
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
    isVisible ? onFocus() : onBlur();
    return () => onBlur();
  }, [isVisible]);

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
    }
    return () => dispatch(pauseLiveAutofetch());
  }, []);

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMore}
      hasMore={hasMore}
      height="100%"
      endMessage={
        <p
          style={{
            fontFamily: "HK Grotesk",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {ended
            ? "To bolo všetko v rámci tohto LIVE prenosu."
            : "LIVE sa práve začal."}
        </p>
      }
      style={{ padding: "0 10px" }}
    >
      <>
        {news.map((item) => (
          <LiveNewsItem key={item.id} post={item} />
        ))}
        {isLoading ? Loader() : ""}
        <Divider height="10px" />
      </>
    </InfiniteScroll>
  );
}

export default Live;
