import { useSelector } from "react-redux";
import {
  SESSION_NAMES,
  SESSION_DURATIONS,
  getSesDurationText
} from "../../utils/sessions";

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

  ${props =>
    props.loading
      ? `
    margin: 15px 10px;

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
      : ""};
`;

const Table = styled.div`
  grid-column: 4 / span 1;
  grid-row: 2 / span 1;

  font-size: 14px;
  font-family: "HK Grotesk", "Source Sans Pro";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: ${props => props.theme.TEXT_COLOR_MILD};
`;

const VenueHeader = styled.div`
  padding-left: 7px;
  border-left: 3px solid #e10600;
`;

const VenueName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const VenueDate = styled.p`
  margin: 0;
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
  justify-content: flex-start;
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
  color: transparent;
  background-color: ${props => props.theme.FILLER_COLOR};
`;

const getTvText = tv => {
  return `vysiela ${tv ? tv : "doplníme..."}`;
};

function CalendarLarge() {
  const {
    isLoading,
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

  if (isLoading) {
    return (
      <>
        <SideSectionTitle title="Najbližšie preteky" />
        <Container loading />
      </>
    );
  }
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
                  event={SESSION_NAMES.FP1}
                  time={getSesDurationText(fp1_time, SESSION_DURATIONS.FP1)}
                  tv={getTvText(fp1_tv)}
                />
              ) : (
                ""
              )}
              {fp2_time ? (
                <CalendarItem
                  event={SESSION_NAMES.FP2}
                  time={getSesDurationText(fp2_time, SESSION_DURATIONS.FP2)}
                  tv={getTvText(fp2_tv)}
                />
              ) : (
                ""
              )}
              {fp3_time ? (
                <CalendarItem
                  event={SESSION_NAMES.FP3}
                  time={getSesDurationText(fp3_time, SESSION_DURATIONS.FP3)}
                  tv={getTvText(fp3_tv)}
                />
              ) : (
                ""
              )}
            </TimesFirstColumn>
            <TimesSecondColumn>
              {q_time ? (
                <CalendarItem
                  event={SESSION_NAMES.Q}
                  time={getSesDurationText(q_time, SESSION_DURATIONS.Q)}
                  tv={getTvText(q_tv)}
                />
              ) : (
                ""
              )}
              {r_time ? (
                <CalendarItem
                  event={SESSION_NAMES.R}
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
