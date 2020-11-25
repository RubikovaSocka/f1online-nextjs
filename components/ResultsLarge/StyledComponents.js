import styled from "styled-components";
import Filler from "./Filler";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 635px;

  @media only screen and (min-width: 1280px) {
    width: 673px;
  }

  ${(props) =>
    props.isLoading
      ? `
    > div {
      width: 48%;
    }
  `
      : ""}
`;

const TableContainer = styled.div`
  width: 310px;

  ${(props) =>
    props.isLoading
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

export { Container, TableContainer };
