import TrackVisibility from "react-on-screen";
import GadsPanel from "../GadsPanel";
import styled from "styled-components";

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

function TrackedPanel({ position, type }) {
  switch (type) {
    case TYPES.LEADERBOARD:
      return (
        <LeaderboardContainer>
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <GadsPanel slot={position} />
          </TrackVisibility>
        </LeaderboardContainer>
      );
    case TYPES.BASIC:
      return (
        <BasicContainer>
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <GadsPanel slot={position} />
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
            <GadsPanel slot={position} inset={true} />
          </TrackVisibility>
        </InsetContainer>
      );
  }
  return null;
}

export { TYPES };
export default TrackedPanel;
