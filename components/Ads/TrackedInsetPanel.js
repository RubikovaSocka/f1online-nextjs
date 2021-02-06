import TrackVisibility from "react-on-screen";
import GadsPanel from "./GadsPanel";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function TrackedInsetPanel({ position }) {
  return (
    <Container>
      <TrackVisibility
        partialVisibility
        style={{ width: "100%", height: "100%" }}
      >
        <GadsPanel slot={position} inset={true} />
      </TrackVisibility>
    </Container>
  );
}

export default TrackedInsetPanel;
