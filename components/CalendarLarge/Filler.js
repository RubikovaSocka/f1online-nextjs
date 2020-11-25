import { Container } from "./StyledComponents";
import SideSectionTitle from "../SideSectionTitle";

function Filler() {
  return (
    <>
      <SideSectionTitle title="Najbližšie preteky" />
      <Container isLoading={true} />
    </>
  );
}

export default Filler;
