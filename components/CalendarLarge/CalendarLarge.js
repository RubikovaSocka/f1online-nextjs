import { useSelector } from "react-redux";
import {
  SESSION_NAMES,
  SESSION_DURATIONS,
  getSesDurationText,
} from "../../utils/sessions";

import {
  Container,
  VenueHeader,
  VenueName,
  VenueDate,
  GPImage,
  TimesContainer,
  Table,
  TimesFirstColumn,
  TimesSecondColumn,
  ShowAllButton,
} from "./StyledComponents";

import LinkAsButton from "../LinkAsButton/LinkAsButton";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import CalendarItem from "./CalendarItem";
import Filler from "../CalResWidget/Filler";

const getTvText = (tv) => {
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
    circuit_image,
  } = useSelector(({ programme }) => programme.event);

  if (isLoading) {
    return <Filler />;
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
              ) : null}
              {fp2_time ? (
                <CalendarItem
                  event={SESSION_NAMES.FP2}
                  time={getSesDurationText(fp2_time, SESSION_DURATIONS.FP2)}
                  tv={getTvText(fp2_tv)}
                />
              ) : null}
              {fp3_time ? (
                <CalendarItem
                  event={SESSION_NAMES.FP3}
                  time={getSesDurationText(fp3_time, SESSION_DURATIONS.FP3)}
                  tv={getTvText(fp3_tv)}
                />
              ) : null}
            </TimesFirstColumn>
            <TimesSecondColumn>
              {q_time ? (
                <CalendarItem
                  event={SESSION_NAMES.Q}
                  time={getSesDurationText(q_time, SESSION_DURATIONS.Q)}
                  tv={getTvText(q_tv)}
                />
              ) : null}
              {r_time ? (
                <CalendarItem
                  event={SESSION_NAMES.R}
                  time={`${r_time}`}
                  tv={getTvText(r_tv)}
                />
              ) : null}
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
