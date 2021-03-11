import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LiveNewsItem from "../LiveNewsItem";
import Filler from "../Filler";
import TrackVisibility from "react-on-screen";
import {
  fetchLiveNewsArchive,
  initialize,
  pauseLiveAutofetch,
  startLiveAutofetch,
} from "../../redux/actions/liveActions";
import Divider from "../Divider";
import InLivePartnerMessage from "./InLivePartnerMessage";

const Loader = () => {
  return [0, 1, 2, 3, 4].map((item, i) => (
    <Filler key={i} height="30px" width="100%" />
  ));
};
const reportedImpressions = new Set();
const AD_FREQUENCY = 10;

function Live({ isVisible, startTime, endTime, adsID }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.live);
  const { news, isLoading, error, hasMore, hasEnded, adsData } = state;
  const ended = hasEnded || (startTime && endTime);

  let counter = 0;
  let partnerMessages =
    adsData && adsData.content
      ? adsData.content.rendered
          .split("</p>\n\n\n\n")
          .map((item) => item + "</p>")
      : null;

  const getNextPartnerMessage = () => {
    let item = null;
    let index = 0;
    if (partnerMessages) {
      index = counter % partnerMessages.length;
      item = partnerMessages[counter % partnerMessages.length];
      counter++;
    }
    return { message: item, index: index };
  };

  const fetchMore = () => {
    dispatch(fetchLiveNewsArchive());
  };

  const onBlur = () => {
    dispatch(pauseLiveAutofetch());
  };

  const onFocus = () => {
    dispatch(startLiveAutofetch());
  };

  const reportClick = (title, targetLink) => {
    console.log("CLICKED", {
      category: "online-click",
      action: title.replace(" ", "-"),
      label: targetLink,
      nonInteraction: false,
    }); /*
    ReactGA.event({
      category: "online-click",
      action: title.replace(" ", "-"),
      label: targetLink,
      nonInteraction: false,
    });*/
  };

  const reportImpression = (title, targetIndex, targetLink) => {
    console.log("IMPRESSIONREPORT");
    if (!reportedImpressions.has(targetIndex)) {
      reportedImpressions.add(targetIndex);
      console.log("IMPRESSION", {
        category: "online-impression",
        action: targetIndex,
        label: targetLink,
        nonInteraction: true,
      }); /*
      ReactGA.event({
        category: "online-impression",
        action: targetIndex,
        label: targetLink,
        nonInteraction: true,
      });*/
    }
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
        adsID: adsID,
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
        {news.map((item, index) => (
          <>
            <LiveNewsItem key={item.id} post={item} />
            {(index + 1) % AD_FREQUENCY === 1 && adsData && (
              <TrackVisibility style={{ width: "100%" }} once>
                <InLivePartnerMessage
                  onClick={(targetLink) =>
                    reportClick(adsData.title.rendered, targetLink)
                  }
                  onImpression={(targetIndex, targetLink) =>
                    reportImpression(
                      adsData.title.rendered,
                      targetIndex,
                      targetLink
                    )
                  }
                  {...getNextPartnerMessage(index)}
                  {...adsData.acf}
                />
              </TrackVisibility>
            )}
          </>
        ))}
        {isLoading ? Loader() : ""}
        <Divider height="10px" />
      </>
    </InfiniteScroll>
  );
}

export default Live;
