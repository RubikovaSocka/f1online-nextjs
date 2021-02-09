import React, { useState, useEffect } from "react";
import AdSense from "react-adsense";
import ReactGA from "react-ga";
import { POSITION } from "../positions";

const getPositionName = (id) => {
  switch (id) {
    case POSITION.LEADERBOARD:
      return "LEADERBOARD";
    case POSITION.CONTENT_CALENDAR:
      return "CONTENT_CALENDAR";
    case POSITION.CONTENT_ARCHIVE:
      return "CONTENT_ARCHIVE";
    case POSITION.CONTENT_ARTICLE:
      return "CONTENT_ARTICLE";
    case POSITION.CONTENT_HP:
      return "CONTENT_HP";
    case POSITION.CONTENT_ARTICLE_END:
      return "CONTENT_ARTICLE_END";
    case POSITION.CONTENT_DRIVER_DETAIL:
      return "CONTENT_DRIVER_DETAIL";
    case POSITION.CONTENT_TEAMS_PAGE:
      return "CONTENT_TEAMS_PAGE";
    case POSITION.CONTENT_TEAM_DETAIL:
      return "CONTENT_TEAM_DETAIL";
    case POSITION.CONTENT_DRIVERS_PAGE:
      return "CONTENT_DRIVERS_PAGE";
    case POSITION.SIDEBAR_HP_TOP:
      return "SIDEBAR_HP_TOP";
    case POSITION.SIDEBAR_ARTICLE:
      return "SIDEBAR_ARTICLE";
    case POSITION.SIDEBAR_RYCHLESPRAVY:
      return "SIDEBAR_RYCHLESPRAVY";
    case POSITION.CONTENT_HP_TITLE_AREA:
      return "CONTENT_HP_TITLE_AREA";
    case POSITION.FOOTER_HP:
      return "FOOTER_HP";
    case POSITION.SIDEBAR_ARCHIVE_TOP:
      return "SIDEBAR_ARCHIVE_TOP";
    case POSITION.CONTENT_ARTICLE_COMMENTS:
      return "CONTENT_ARTICLE_COMMENTS";
    case POSITION.CONTENT_QUICKNEWS_PAGE:
      return "CONTENT_QUICKNEWS_PAGE";
    case POSITION.SIDEBAR_QUICKNEWS_PAGE:
      return "SIDEBAR_QUICKNEWS_PAGE";
    case POSITION.CONTENT_QUICKNEWS_PAGE_TOP:
      return "CONTENT_QUICKNEWS_PAGE_TOP";
    default:
      return "Unknown";
  }
};

const countImpression = (slot) => {
  ReactGA.event({
    category: "impression",
    action: `${getPositionName(slot)}-${window.innerWidth < 1024 ? "m" : "pc"}`,
    label: `${window.location.href}`,
    nonInteraction: true,
  });
  /*console.log(
    "COUNT IMPRESSION",
    `${getPositionName(slot)}-${window.innerWidth < 1024 ? "m" : "pc"}`,
    `${window.location.href}`
  );*/
};

function GadsPanel({ slot, isVisible, inset }) {
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (isVisible && !counted) {
      //If recorded, do not record in the future
      countImpression(slot);
      setCounted(true);
    }
  }, [isVisible]);

  if (inset) {
    return (
      <AdSense.Google
        client="ca-pub-2681240380511410"
        slot={slot}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        layout="in-article"
        format=""
      />
    );
  }
  return (
    <AdSense.Google
      client="ca-pub-2681240380511410"
      slot={slot}
      style={{
        display: "block",
      }}
      //layout="in-article"
      format="auto"
      responsive="true"
    />
  );
}

export default GadsPanel;
