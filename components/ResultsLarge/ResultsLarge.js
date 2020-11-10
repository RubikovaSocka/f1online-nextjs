import { useSelector } from "react-redux";

import SideSectionTitle from "../SideSectionTitle";
import LinkAsButton from "../LinkAsButton/LinkAsButton";
import Divider from "../Divider";
import DriverDataItem from "./ResultsRowItem";

import { Container, TableContainer } from './StyledComponents'
import Filler from "./Filler";

function ResultsLarge() {
  const isLoading = useSelector(({ f1Results }) => f1Results.isLoading);
  const venueName = useSelector(({ f1Results }) =>
    f1Results.results[0] ? f1Results.results[0].venueName : ""
  );
  const raceData = useSelector(({ f1Results }) =>
    f1Results.results[0] ? f1Results.results[0].race : ""
  );
  const champData = useSelector(({ f1Results }) =>
    f1Results.results[0] ? f1Results.results[0].driverChamp : ""
  );

  if (isLoading) {
    return (
      <Filler />
    );
  }
  return (
    <Container>
      <div>
        <SideSectionTitle title={`Výsledky VC ${venueName}`} />
        <TableContainer>
          {raceData.slice(1, 6).map((item, index) => (
            <DriverDataItem
              renderID="gp"
              key={index}
              pos={item.position}
              name={item.driverName}
              team={item.teamName}
              time={item.split}
            />
          ))}
          <Divider height="10px" />
          <LinkAsButton
            target="/vysledky"
            title="Kompletné výsledky pretekov"
          />
        </TableContainer>
      </div>
      <div>
        <SideSectionTitle title={`Šampionát po VC ${venueName}`} />
        <TableContainer>
          {champData.slice(1, 6).map((item, index) => (
            <DriverDataItem
              key={index}
              pos={item.position}
              name={item.driverName}
              team={item.teamName}
              time={`${item.points}b`}
            />
          ))}
          <Divider height="10px" />
          <LinkAsButton
            target="/vysledky"
            title="Priebežné poradie šampionátu"
          />
        </TableContainer>
      </div>
    </Container>
  );
}

export default ResultsLarge;
