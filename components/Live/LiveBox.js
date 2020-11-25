import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { usePageVisibility } from "react-page-visibility";
import Live from "./Live";
import ChatContainer from "./ChatContainer";
import onMobile from "../../utils/onMobile";

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.BASIC_LINE_COLOR};

  height: calc(100vh - 90px);
  z-index: 4;

  @media only screen and (min-width: 1024px) {
    height: calc(100vh - 130px);
  }

  .infinite-scroll-component__outerdiv {
    height: calc(100% - 37px);
  }
`;

const ButtonsRow = styled.div`
  padding: 8px 10px;
  height: 21px;
  box-shadow: -4px 4px 8px -8px rgba(0, 0, 0, 0.4);

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 1px;
    z-index: -1;
    transform: scale(0.9);
    box-shadow: 0px 0px 8px 2px #000000;
  }
  span {
    display: inline-block;
    font-family: HK Grotesk;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${(props) => props.theme.TEXT_COLOR_MILD};
    text-transform: uppercase;
  }
`;
const Button = styled.span`
  cursor: pointer;
  font-family: HK Grotesk;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};

  &:before {
    display: inline-block;
    font-style: regular;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    font-size: 14px;
    //content: "\f075";
  }
`;

const ChatButton = styled(Button)`
  float: right;
  &:before {
    //content: "\f075";
    ${(props) =>
      props.isOpened
        ? `font-weight: 900;
         content: "\f4b3"`
        : `font-weight: 400;
         content: "\f075"`}
  }
`;

const LiveIcon = styled.span`
  width: 25px;
  display: inline-block;
  font-family: HK Grotesk;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  text-transform: uppercase;

  @keyframes example {
    0%,
    100% {
      left: -32px;
    }

    50% {
      left: -2px;
    }
  }
  &:after {
    font-style: regular;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    font-size: 14px;

    content: "\f111";
    font-weight: 900;
    font-size: 4px;
    animation: example 3.2s linear infinite;
    position: relative;
    bottom: -8px;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  ${(props) => (props.isOpened ? "position: fixed;" : "display: none")};

  top: 69px;
  left: 0;
  height: 77px;
  width: 70px;
  z-index: 5;
  background-color: white;
  border: none;
  padding: 0;

  &:after {
    display: inline-block;
    font-style: regular;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 20px;
    content: "\f4b3";
  }

  @media only screen and (min-width: 1024px) {
    top: 0;
    left: auto;
    right: calc(50vw - 515px + 340px);
    height: 30px;
    width: 30px;
    z-index: 14;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);

    &:after {
      font-size: 14px;
    }
  }
`;

function LiveBox(props) {
  const [chatOpened, setChatOpened] = useState(false);
  const [chat, setChat] = useState(null);
  const state = useSelector((state) => state.live);
  const { hasEnded } = state;

  const isVisible = usePageVisibility();

  useEffect(() => {
    onMobile() && (document.body.style.overflow = "hidden");
    return () => onMobile() && (document.body.style.overflow = "");
  }, []);

  useEffect(() => {
    onMobile() && chatOpened && (document.body.style.overflow = "hidden");
    onMobile() && !chatOpened && (document.body.style.overflow = "");
  }, [chatOpened]);

  const chatButtonPressed = () => {
    setChatOpened((prev) => !prev);
  };

  if (chatOpened && !chat) {
    setChat(<ChatContainer isOpened={chatOpened} />);
  }

  return (
    <>
      <Container>
        <ButtonsRow>
          {hasEnded ? <span>Live sa skončil</span> : <LiveIcon> Live</LiveIcon>}
          <ChatButton onClick={chatButtonPressed} isOpened={chatOpened}>
            {" "}
            CHAT
          </ChatButton>
        </ButtonsRow>
        <Live isVisible={isVisible} {...props} />
      </Container>
      {chatOpened ? chat : ""}
      <CloseButton onClick={chatButtonPressed} isOpened={chatOpened} />
    </>
  );
}

export default LiveBox;
