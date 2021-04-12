import React from "react";
import {
  pickPartner,
  filterImpressedPartners,
  randomArrayElement,
} from "./utils";
import TrackVisibility from "react-on-screen";
import BannerPanel from "../BannerPanel";
import styled from "styled-components";
import onMobile from "../../../utils/onMobile";

const LeaderboardContainer = styled.div`
  width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;

  @media only screen and (min-width: 1024px) {
    width: 972px;
  }
  @media only screen and (min-width: 1280px) {
    width: 1031px;
  }
`;

const BasicContainer = styled.div`
  width: 100%;
`;

const InsetContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TYPES = {
  LEADERBOARD: "LEADERBOARD",
  BASIC: "BASIC",
  INSET: "INSET",
};

function TrackedPanel({ topProps, stateProps, impressionsCounter }) {
  const { position, type, sidebar } = topProps;
  const { json, isLoading, probabilites } = stateProps;

  if (isLoading) return null;

  //filter capped partners from partners probabilities array
  const partnersProbabilitesFiltered = filterImpressedPartners({
    impressionsData: impressionsCounter,
    partnersData: probabilites,
    cappings: json,
  });
  // pick randomly one not-yet-capped partner
  const partner = pickPartner({
    partnersVector: partnersProbabilitesFiltered,
    partnersData: json,
  });

  //  if (type === TYPES.LEADERBOARD) {
  // console.log(partnersProbabilitesFiltered);
  // console.log(json);
  // console.log(partner);
  //}

  switch (type) {
    case TYPES.LEADERBOARD:
      /*return (
        <LeaderboardContainer>
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <BannerPanel slot={position} />
          </TrackVisibility>
        </LeaderboardContainer>
      );*/
      return (
        <LeaderboardContainer>
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <BannerPanel
              partner={partner}
              banner={
                partner
                  ? randomArrayElement(
                      partner.leaderboard[`${onMobile() ? "m" : "pc"}`]
                    )
                  : null
              }
              slot={position}
            />
          </TrackVisibility>
        </LeaderboardContainer>
      );
    case TYPES.BASIC:
      return (
        <BasicContainer>
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <BannerPanel
              partner={partner}
              banner={
                partner
                  ? randomArrayElement(
                      partner.content[`${onMobile() || sidebar ? "m" : "pc"}`]
                    )
                  : null
              }
              slot={position}
            />
          </TrackVisibility>
        </BasicContainer>
      );
    case TYPES.INSET:
      return (
        <InsetContainer>
          <TrackVisibility
            partialVisibility
            style={{ width: "100%", height: "100%" }}
          >
            <BannerPanel partner={partner} slot={position} inset={true} />
          </TrackVisibility>
        </InsetContainer>
      );
  }
  return null;
}

function preventRerender(prevProps, nextProps) {
  if (JSON.stringify(prevProps.topProps) === JSON.stringify(nextProps.topProps))
    return true;
  if (
    JSON.stringify(prevProps.stateProps) ===
    JSON.stringify(nextProps.stateProps)
  )
    return true;
  return false;
}

export { TYPES };
export default React.memo(TrackedPanel, preventRerender);
