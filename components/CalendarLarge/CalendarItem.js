import styled from "styled-components";

const itemWidth = "152px";
const borderLeftWidth = "3px";

const OverlapContainer = styled.div`
  position: relative;
  padding-left: 0px;
  width: 138px;
  height: 20px;
  overflow: hidden;
  color: var(--basic-text-color);

  @media only screen and (min-width: 1280px) {
    width: 155px;
  }
`;

const Event = styled.span`
  height: 22px;
  padding-left: 7px;
  font-weight: 600;
  color: var(--basic-text-color);
`;

const TVStations = styled.span`
  position: absolute;
  right: calc(${itemWidth} + 3px);
  width: 135px;
  background-color: var(--calendar-verline-color);

  padding-left: 5px;
  padding-right: 4px;
  position: absolute;
  z-index: 2;

  display: block;
  transition: ease-in-out 0.5s;

  @media only screen and (min-width: 1280px) {
    width: ${itemWidth};
  }
`;

const Time = styled.span`
  width: ${itemWidth};
  position: absolute;
  padding-left: 7px;
  color: var(--basic-text-color);
  z-index: 1;
`;

const ItemContainer = styled.div`
  margin: 14px 0px -2px 0;
  width: ${itemWidth} - 5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: ${borderLeftWidth} solid #d4d4d4;

  z-index: 0;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media only screen and (min-width: 1280px) {
    margin-right: 10px;
    width: ${itemWidth};
    border-left: ${borderLeftWidth} solid var(--calendar-verline-color);
  }

  &:hover ${TVStations} {
    right: -3px;
    color: black;
  }
`;

function CalendarItem({ event, time, tv }) {
  return (
    <ItemContainer>
      <Event>{event}</Event>
      <OverlapContainer>
        <Time>{time}</Time>
        <TVStations>{tv}</TVStations>
      </OverlapContainer>
    </ItemContainer>
  );
}
export default CalendarItem;
