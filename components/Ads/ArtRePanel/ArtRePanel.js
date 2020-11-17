import { useSelector } from "react-redux";
import ChangablePanel from "../ChangeablePanel";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0;

  @media only screen and (min-width: 1024px) {
    width: 100%;
    max-width: 650px;
    margin: 25px auto;
  }

  .panel {
    width: 100%;

    img {
      width: 280px;
      display: block;
      margin: auto;

      @media only screen and (min-width: 340px) {
        width: 300px;
      }
      @media only screen and (min-width: 1024px) {
        width: 100%;
      }
    }
  }
`;

function ArtRePanel(props) {
  const panelsState = useSelector((state) => state.panels);
  const { isLoading, json, error } = panelsState;

  if (isLoading || error) {
    return null;
  }
  return (
    <Container>
      <ChangablePanel panels={json.art} positionName="art" {...props} />
    </Container>
  );
}

export default ArtRePanel;
