import { Container, LoaderPanel, Item } from "./StyledComponents";
import SideSectionTitle from "../SideSectionTitle";

function Filler() {
  return (
    <Container>
      <SideSectionTitle title="Rýchle správy" />
      <LoaderPanel loader width="286px" height="440px" margin="20px auto">
        <Item delay="0" />
        <Item delay="0.1s" />
        <Item delay="0.2s" />
        <Item delay="0.3s" />
        <Item delay="0.4s" />
      </LoaderPanel>
    </Container>
  );
}

export default Filler;
