import { Container, TableContainer } from "./StyledComponents";
import SideSectionTitle from "../SideSectionTitle";

function Filler() {
  return (
    <Container loading>
      <div>
        <SideSectionTitle title={`Výsledky`} />
        <TableContainer loading />
      </div>
      <div>
        <SideSectionTitle title={`Šampionát`} />
        <TableContainer loading />
      </div>
    </Container>
  );
}

export default Filler;
