import { useSelector } from "react-redux";
import ChangeablePanel from "../ChangeablePanel";
import styled from "styled-components";
import TrackVisibility from "react-on-screen";

const Container = styled.div`
  display: none;

  @media only screen and (min-width: 1024px) {
    margin: 0;
    width: 100%;
    height: 110px;

    background-color: ${(props) => props.theme.HEADER_PANEL_BACK_COLOR};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .panel {
      display: initial;
      max-width: 970px;
      height: 90px;
      background-color: none;

      display: flex;
      flex-direction: row;
      justify-content: center;

      img {
        width: auto;
        height: 100%;
      }
    }
  }
`;
function HeaderRePanel(props) {
  const panelsState = useSelector((state) => state.panels);
  const { isLoading, json, error } = panelsState;

  if (isLoading || error) {
    return null;
  }
  return (
    <Container>
      <TrackVisibility partialVisibility>
        <ChangeablePanel panels={json.top} positionName="top" {...props} />
      </TrackVisibility>
    </Container>
  );
}

export default HeaderRePanel;
