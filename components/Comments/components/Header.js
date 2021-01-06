import React from "react";
import styled from "styled-components";
import formatDate from "../../../utils/dateFormatter";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  font-family: HK Grotesk;
  font-size: 14px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  //border-bottom: 1px solid ${(props) => props.theme.BASIC_LINE_COLOR};
`;

const Username = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

const Time = styled.span`
  color: ${(props) => props.theme.SUBTITLE_COLOR};
  margin: 0 5px;
`;

export default function Header({ username, time }) {
  return (
    <Container>
      <Username>{username}</Username>•
      <Time>{formatDate(time.split(".")[0])}</Time>
    </Container>
  );
}
