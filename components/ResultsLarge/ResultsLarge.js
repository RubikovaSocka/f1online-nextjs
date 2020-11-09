import { useSelector } from "react-redux";

import SideSectionTitle from "../SideSectionTitle";
import LinkAsButton from "../LinkAsButton/LinkAsButton";
import Divider from "../Divider";
import DriverDataItem from "./ResultsRowItem";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 635px;

  @media only screen and (min-width: 1280px) {
    width: 673px;
  }

  ${props =>
    props.loading
      ? `
    > div {
      width: 48%;
    }
  `
      : ""}
`;

const TableContainer = styled.div`
  width: 310px;

  ${props =>
    props.loading
      ? `
    margin: 15px 10px;
    width: 95%;
    height: 240px;
    background-color: ${props.theme.FILLER_COLOR};
    overflow: hidden;
    position: relative;
    @keyframes slide {
      0% {transform:translateX(-100%);}
      100% {transform:translateX(100%);}
    }
    :after {
      content:'';
      top:0;
      transform:translateX(100%);
      width:100%;
      height:100%;
      position: absolute;
      z-index:1;
      animation: slide 1s infinite;

      background: ${props.theme.FILLER_SHINE_GRADIENT};
    }
    `
      : `@media only screen and (min-width: 1280px) {
          width: 320px;
        }
    `};
`;

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
