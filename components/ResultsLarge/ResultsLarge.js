import { useSelector } from "react-redux";

import SideSectionTitle from "../SideSectionTitle";
import LinkAsButton from "../LinkAsButton/LinkAsButton";
import Divider from "../Divider";
import DriverDataItem from "./ResultsRowItem";

import { Container, TableContainer } from "./StyledComponents";
import Filler from "./Filler";

function ResultsLarge() {
  const state = useSelector(state => state.f1Results);
  const { isLoading } = state;
  const last = state.results[0];
  const venueName = last ? last.venueName : "";
  const raceData = last ? last.race : "";
  const champData = last ? last.driverChamp : "";

  console.log(state);
  if (isLoading) {
    return <Filler />;
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
