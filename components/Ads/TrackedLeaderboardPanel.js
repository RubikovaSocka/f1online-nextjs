import TrackVisibility from "react-on-screen";
import GadsPanel from "./GadsPanel";

import styled from "styled-components";

const Container = styled.div`
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

function TrackedLeaderboardPanel({ position }) {
  return (
    <Container>
      <TrackVisibility partialVisibility style={{ width: "100%" }}>
        <GadsPanel slot={position} />
      </TrackVisibility>
    </Container>
  );
}

export default TrackedLeaderboardPanel;
