import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;

  &.opened {
    background-color: var(--table-back-color);
    color: white;
  }
  background-color: ${props => props.theme.CALENDAR_HEADER_COLOR};

  .header {
    font-family: "HK Grotesk";
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.TEXT_COLOR};

    padding: 10px 15px;
    background-color: ${props => props.theme.CALENDAR_HEADER_COLOR};
    //border: 1px solid var(--lines-color);
    //border-bottom: none;

    cursor: pointer;
    //font-family: "HK Grotesk"
    transition-delay: 0.1s;
    i {
      margin-right: 15px;
    }

    &:hover,
    &.opened {
      background-color: ${props => props.theme.TABLE_SECONDARY_COLOR};
      color: ${props => props.theme.PAGE_BACK_COLOR};
    }
    &.opened {
      border-bottom: none;
    }
  }

  .contentBox {
    background-color: ${props => props.theme.TABLE_SECONDARY_COLOR};
    transition: ease-in-out 0.25s;
    &.closed {
      height: 0px;
    }
  }

  .table {
    font-family: "HK Grotesk";
    font-size: 15px;
    padding: 10px 10px 20px 10px;
    color: ${props => props.theme.PAGE_BACK_COLOR};
    overflow: scroll;
    span {
      display: inline-block;
    }
  }
  .tableHeader {
    font-weight: 600;
  }
  .tableRow {
    height: 24px;
    width: 560px;
  }

  .position {
    width: 40px;
    text-align: center;
  }
  .name {
    width: 140px;
    width: calc(50% - 140px);
  }
  .team {
    width: 130px;
    width: calc(50% - 180px);
  }
  .laps {
    width: 80px;
    text-align: center;
  }
  .split {
    width: 100px;
  }
  .points {
    width: 60px;
  }

  @media only screen and (min-width: 1024px) {
    .table {
      overflow: hidden;
    }
    .tableRow {
      width: 100%;
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
