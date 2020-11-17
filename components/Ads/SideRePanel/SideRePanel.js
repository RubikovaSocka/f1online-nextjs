import { useSelector } from "react-redux";
import ChangeablePanel from "../ChangeablePanel";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px 0;
  @media only screen and (min-width: 340px) {
    margin: 10px 0;
  }
  @media only screen and (min-width: 1024px) {
    width: 100%;
    margin: 0 auto;
    background-color: none;
  }

  .panel {
    width: 100%;
    @media only screen and (min-width: 1024px) {
      display: initial;
      background-color: none;
    }
    img {
      width: 290px;
      display: block;
      margin: auto;

      @media only screen and (min-width: 340px) {
        width: 300px;
      }
    }
  }
`;

function SideRePanel(props) {
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

export default SideRePanel;
