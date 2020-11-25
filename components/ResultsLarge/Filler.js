import { Container, TableContainer } from "./StyledComponents";
import SideSectionTitle from "../SideSectionTitle";

function Filler() {
  return (
    <Container isLoading={true}>
      <div>
        <SideSectionTitle title={`Výsledky`} />
        <TableContainer isLoading={true} />
      </div>
      <div>
        <SideSectionTitle title={`Šampionát`} />
        <TableContainer isLoading={true} />
      </div>
    </Container>
  );
}

export default Filler;
