import TrackVisibility from "react-on-screen";
import GadsPanel from "./GadsPanel";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  //background-color: yellow;
`;

function TrackedBasicPanel({ position }) {
  return (
    <Container>
      <TrackVisibility partialVisibility style={{ width: "100%" }}>
        <GadsPanel slot={position} />
      </TrackVisibility>
    </Container>
  );
}

export default TrackedBasicPanel;
