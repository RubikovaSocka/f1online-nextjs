import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Filler from "../Filler";
import {
  fetchLiveNewsArchive,
  initialize,
  startLiveAutofetch,
} from "../../redux/actions/liveActions";

function Live({ startTime, endTime }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.live);
  const { news, isLoading, error, hasMore } = state;
  console.log("LIVE NEWS");
  console.log(state);
  const fetchMore = () => {
    dispatch(fetchLiveNewsArchive());
  };

  useEffect(() => {
    dispatch(
      initialize({
        start: "2020-11-15T11:00:05",
        end: "2020-11-20T23:00:01",
      })
    );
    dispatch(startLiveAutofetch());
    //dispatch(fetchLiveNewsArchive());
  }, []);

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={() => fetchMore()}
      hasMore={hasMore}
      height={200}
      loader={<Filler height="100px" width="100%" />}
      endMessage={
        <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
          <b>Toto bola posledná správa onlinu.</b>
        </p>
      }
    >
      {news.map((item, i) => (
        <div height="40px" key={i}>
          <span>{item.date.split("T")[1]}</span> <span>{item.acf.sprava}</span>
          <br />
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default Live;
