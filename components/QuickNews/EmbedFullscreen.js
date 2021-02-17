import React, { useEffect } from "react";
import Image from "next/image";
import ReactGA from "react-ga";
import * as fbq from "../../lib/fpixel";

import styled from "styled-components";
import { POSITION } from "../Ads/positions";
import TrackedInsetPanel from "../Ads/TrackedInsetPanel";

import EmbedContainer from "react-oembed-container";
import EmbedExorcist from "../EmbedExorcist";

const Container = styled.div`
  z-index: 150;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;

  width: calc(100% - 40px);
  height: calc(100% - 100px);

  padding: 10px 0;

  background-color: ${(props) => props.theme.PAGE_BACK_COLOR};
  box-shadow: ${(props) => props.theme.POPUP_SHADOW};
  border: ${(props) => props.theme.POPUP_BORDER};
  overflow: hidden;

  @media only screen and (min-width: 1024px) {
    width: 920px;
    top: 0;
    bottom: 0;
    height: calc(100vh - 100px);
    max-height: 660px;
    padding: 10px;
  }
`;

const MessageText = styled.div`
  padding: 0 8px;
  font-family: "HK Grotesk";
  font-size: 14px;
  z-index: 0;
  width: calc(100% - 16px);
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  p {
    margin: 5px 0;

    &:last-of-type {
      margin-bottom: 20px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  background: none;
  border: 0;
  padding: 0;
  font-size: 24px;
  padding: 5px 12px;
  cursor: pointer;
  color: ${(props) => props.theme.SUBTITLE_COLOR};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.TEXT_COLOR};
  }
  span {
    text-transform: uppercase;
    font-family: "HK Grotesk";
    font-size: 13px;
    font-weight: 600;
    margin-right: 3px;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 40px;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: calc(100% - 30px);

  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;

  > div {
    width: 100%;
  }

  @media only screen and (max-width: 1023px) {
    height: ${(props) =>
      props.textOnly ? "calc(50% - 10px)" : "calc(100% - 160px)"};
  }

  @media only screen and (min-width: 1024px) {
    left: 20px;
    width: calc(100% - 360px);
    height: calc(100% - 60px);
    padding: 0;

    > div {
      width: calc(100% - 20px);
    }
  }
`;

const RPanel = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;

  width: calc(100% - 20px);
  height: 70px;
  overflow: hidden;

  @media only screen and (min-width: 1024px) {
    top: 40px;
    right: 20px;
    bottom: unset;

    width: 300px;
    height: calc(100% - 60px) !important;
  }
`;

const ExorcistContainer = styled(EmbedExorcist)`
  //margin-top: 10px;
  width: 100%;
  @media only screen and (min-width: 1024px) {
    width: calc(100% - 20px);
  }
`;

const BContainer = styled.div`
  height: 80px;
  width: 100%;
  @media only screen and (min-width: 1024px) {
    height: 100%;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Date = styled.p`
  padding: 0 8px;
  font-family: "HK Grotesk";
  font-size: 14px;
  margin-bottom: 12px;
  margin-right: 10px;
  color: ${(props) => props.theme.SUBTITLE_COLOR};

  &::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 6px;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    color: #e10600;
    content: "\f017";
  }
`;

function EmbedFullscreen(props) {
  const { id, date, embed, image, content, hideClick, hidePopup } = props;

  useEffect(() => {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
    ReactGA.pageview(`/rychle-spravy/${id}`);

    const oldPath = window.location.pathname;
    window.history.replaceState(null, "", `/rychle-spravy/${id}`);
    // returned function will be called on component unmount
    return () => {
      window.history.replaceState(null, "", oldPath);
    };
  }, []);

  return (
    <Container>
      <Content textOnly={embed.length === 0 && !image}>
        <Header>
          <Date>{date}</Date>
          <div>
            <iframe
              src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(
                `https://f1online.sk/rychle-spravy/${id}`
              )}&width=128&layout=button_count&action=like&size=small&share=true&height=46&appId=2583504588587008`}
              width="183"
              height="25"
              style={{ border: "none", overflow: "hidden", paddingTop: "4px" }}
              scrolling="no"
              frameBorder="0"
              allow="encrypted-media"
            />
          </div>
        </Header>
        <MessageText
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {embed ? (
          <EmbedContainer markup={embed}>
            <ExorcistContainer
              embedOnlyContainer
              dangerouslySetInnerHTML={{
                __html: embed,
              }}
            />
          </EmbedContainer>
        ) : image ? (
          <Image src={image.url} width={image.width} height={image.height} />
        ) : (
          ""
        )}
      </Content>
      <RPanel>
        <BContainer>
          <TrackedInsetPanel position={POSITION.SIDEBAR_RYCHLESPRAVY} />
        </BContainer>
      </RPanel>
      <CloseButton
        onClick={() => {
          hideClick();
          hidePopup();
        }}
      >
        <span>Zavrieť</span>&times;
      </CloseButton>
    </Container>
  );
}

export default EmbedFullscreen;
