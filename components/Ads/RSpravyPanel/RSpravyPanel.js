import { useSelector } from "react-redux";
import ChangeablePanel from "../ChangeablePanel";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px 0;

  @media only screen and (min-width: 340px) {
    margin: 10px 0;
  }
  @media only screen and (min-width: 1024px) {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    background-color: none;
  }

  .container {
    height: 100%;
  }

  .panel {
    width: 100%;
    @media only screen and (min-width: 1024px) {
      display: inline-block;
      background-color: none;
      height: 100%;
    }
    img {
      width: 290px;
      display: block;
      margin: auto;

      @media only screen and (min-width: 340px) {
        width: 300px;
      }
      @media only screen and (min-width: 1024px) {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`;

function RSpravyPanel(props) {
  const panelsState = useSelector((state) => state.panels);
  const { isLoading, json, error } = panelsState;

  if (isLoading || error) {
    return null;
  }
  return (
    <Container>
      <ChangeablePanel panels={json.side} positionName="side" {...props} />
    </Container>
  );
}

export default RSpravyPanel;
