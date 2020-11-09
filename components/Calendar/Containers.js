import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  &.opened {
    background-color: ${props => props.theme.TABLE_PRIMARY_COLOR};
    color: white;
  }
  .date {
    display: inline-block;
    width: 120px;
  }
  .venueName {
    text-transform: uppercase;
    font-weight: 600;
  }
  .venueName,
  .date {
    font-family: "HK Grotesk";
  }
  .raceTime {
    font-family: "HK Grotesk";
    display: none;
  }
  .header {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 10px 15px;
    background-color: ${props => props.theme.CALENDAR_HEADER_COLOR};

    
    font-size: 15px;
    color: ${props => props.theme.TEXT_COLOR};
    transition-delay: 0.1s;
    i {
      margin-right: 15px;
    }

    &:hover,
    &.opened {
      background-color: ${props => props.theme.TABLE_PRIMARY_COLOR};
      color: white;
    }
    &.opened {
      border-bottom: none;
      padding-bottom: 30px;
    }
  }
  .contentBox {
    overflow: scroll;
    padding-left: 15px;
    background-color: ${props => props.theme.TABLE_PRIMARY_COLOR};
    transition: ease-in-out 0.25s;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &.opened {
      height: 180px;
    }
    &.closed {
      height: 0px;
    }
  }
  .circuitContainer {
    width: calc(100% - 390px - 90px);
    height: auto;
    margin-right: 55px;

    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 100px;
    }
    span {
      max-height: 100%;
      width: 100%;
      text-align: center;
      font-family: "HK Grotesk";
      display: inline-block;
      font-size: 15px;
      font-weight: 600;
    }
  }
  .timesRow {
    height: 25px;
    width: 390px;

    span {
      font-family: "HK Grotesk";
      font-size: 15px;
      display: inline-block;
    }
    .session {
      width: 110px;
    }
    .sessionTime {
      width: 130px;
    }
    .sessionTV {
      width: 150px;
    }
  }
  .timesRowHeader {
    span {
      font-weight: 600;
    }
  }
  .venueHeaderDate {
    display: inline-block;
    width: 100%;
  }
  .venueName,
  .date {
    width: 100%;
  }

  @media only screen and (min-width: 1024px) {
    .header {
      justify-content: flex-start;
    }
    .venueName,
    .date {
      width: initial;
    }
    .contentBox {
      padding-left: 45px;
      overflow: hidden;
    }
    .date {
      width: 120px;
    }
    .raceTime {
      display: inline-block;
    }
    .venueHeaderDate {
      display: inline-block;
      width: initial;
    }
    .venueName {
      width: calc(100% - 230px);
    }
    .circuitContainer {
      display: flex;
    }
    .timesRow {
      height: 25px;
      width: initial;
      span {
        font-family: "HK Grotesk";
        font-size: 15px;
        display: inline-block;
      }
      .session {
        width: 110px;
      }
      .sessionTime {
        width: 130px;
      }
      .sessionTV {
        width: 150px;
      }
    }
  }
`;

const Chevron = styled.span`
  ::after {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;

    line-height: 16px;
    height: 16px;
    margin-right: 10px;

    ${props => (props.isOpened ? `content: "\f077";` : `content: "\f078";`)}
  }
`;

export { Container, Chevron };
