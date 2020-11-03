import { useSelector } from "react-redux";
import { addMinutes, format, parse } from "date-fns";

import LinkAsButton from "../LinkAsButton/LinkAsButton";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import CalendarItem from "./CalendarItem";

import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 328px 17px 305px 30px 305px auto;
  grid-template-rows: 10px 205px 30px 26px;

  @media only screen and (min-width: 1280px) {
    grid-template-columns: auto 328px 17px 328px 38px 320px auto;
  }
`;

const Table = styled.div`
  grid-column: 4 / span 1;
  grid-row: 2 / span 1;

  font-size: 14px;
  font-family: "HK Grotesk", "Source Sans Pro";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
`;

const VenueHeader = styled.div`
  padding-left: 7px;
  border-left: 3px solid #e10600;
`;

const VenueName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--basic-text-color);
`;

const VenueDate = styled.p`
  margin: 0;
  color: var(--basic-text-color);
`;

const TimesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TimesFirstColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimesSecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ShowAllButton = styled.div`
  grid-column: 4 / span 1;
  grid-row: 3 / span 1;
  margin-top: 10px;
  margin-right: 40px;

  @media only screen and (min-width: 1280px) {
    margin-right: 10px;
  }
`;

const GPImage = styled.img`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  height: 100%;
`;

const getTimeText = (time, minutes) => {
  return `${time} - ${format(
    addMinutes(parse(time, "HH:mm", new Date()), minutes),
    "HH:mm"
  )}`;
};

const getTvText = tv => {
  return `vysiela ${tv ? tv : "doplníme..."}`;
};

const SESSIONS = {
  FP1: "1. tréning",
  FP2: "2. tréning",
  FP3: "3. tréning",
  Q: "Kvalifikácia",
  R: "Preteky"
};

const SESSION_DUR = {
  FP1: 90,
  FP2: 90,
  FP3: 60,
  Q: 60
};

function CalendarLarge() {
  const {
    venue_name,
    venue_date,
    fp1_time,
    fp2_time,
    fp3_time,
    q_time,
    r_time,
    fp1_tv,
    fp2_tv,
    fp3_tv,
    q_tv,
    r_tv,
    circuit_image
  } = useSelector(({ programme }) => programme.event);

  return (
    <>
      <SideSectionTitle title="Najbližšie preteky" />
      <Container>
        <GPImage
          alt={`Ilustračná foto k VC ${venue_name}`}
          src={`${circuit_image}`}
        />
        <Table>
          <VenueHeader>
            <VenueName>VC {venue_name}</VenueName>
            <VenueDate>{venue_date}</VenueDate>
          </VenueHeader>
          <TimesContainer>
            <TimesFirstColumn>
              {fp1_time ? (
                <CalendarItem
                  event="1. tréning"
                  time={getTimeText(fp1_time, SESSION_DUR.FP1)}
                  tv={getTvText(fp1_tv)}
                />
              ) : (
                ""
              )}
              {fp2_time ? (
                <CalendarItem
                  event="2. tréning"
                  time={getTimeText(fp2_time, SESSION_DUR.FP2)}
                  tv={getTvText(fp2_tv)}
                />
              ) : (
                ""
              )}
              {fp3_time ? (
                <CalendarItem
                  event="3. tréning"
                  time={getTimeText(fp3_time, SESSION_DUR.FP3)}
                  tv={getTvText(fp3_tv)}
                />
              ) : (
                ""
              )}
            </TimesFirstColumn>
            <TimesSecondColumn>
              {q_time ? (
                <CalendarItem
                  event="Kvalifikácia"
                  time={getTimeText(q_time, SESSION_DUR.Q)}
                  tv={getTvText(q_tv)}
                />
              ) : (
                ""
              )}
              {r_time ? (
                <CalendarItem
                  event="Preteky"
                  time={`${r_time}`}
                  tv={getTvText(r_tv)}
                />
              ) : (
                ""
              )}
            </TimesSecondColumn>
          </TimesContainer>
        </Table>
        <ShowAllButton>
          <LinkAsButton target={"/kalendar"} title={"Celý kalendár"} />
        </ShowAllButton>
      </Container>
    </>
  );
}
export default CalendarLarge;
