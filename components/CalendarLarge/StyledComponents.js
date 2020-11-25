import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 328px 17px 305px 30px 305px auto;
  grid-template-rows: 10px 205px 30px 26px;

  @media only screen and (min-width: 1280px) {
    grid-template-columns: auto 328px 17px 328px 38px 320px auto;
  }

  ${(props) =>
    props.isLoading
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
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
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
  background-color: ${(props) => props.theme.FILLER_COLOR};
`;

export {
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
};
