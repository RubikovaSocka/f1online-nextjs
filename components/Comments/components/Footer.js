import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  font-family: HK Grotesk;
  font-size: 14px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  //border-bottom: 1px solid ${(props) => props.theme.BASIC_LINE_COLOR};
`;

const Score = styled.div`
  &:before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    content: "\f004";
    font-size: 14px;
    color: #e10600;
    cursor: pointer;
  }
`;

const Flag = styled.div`
  &:before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-left: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    content: "\f024";
    font-size: 14px;
    color: #e10600;
    cursor: pointer;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Score></Score>
      {/*<Flag />*/}
    </Container>
  )
}
