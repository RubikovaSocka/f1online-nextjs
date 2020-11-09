import React, { useEffect } from "react";
import EmbedContainer from "react-oembed-container";
import TrackedRSpravyPanel from "../Ads/TrackedRSpravyPanel";
import ReactGA from "react-ga";
import AdSense from "react-adsense";

import styled from "styled-components";
import onMobile from "../../utils/onMobile";

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

  background-color: ${props => props.theme.PAGE_BACK_COLOR};
  box-shadow: ${props => props.theme.POPUP_SHADOW};
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
  color: ${props => props.theme.TEXT_COLOR_MILD};
  p {
    margin-bottom: 3px;
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
  color: ${props => props.theme.SUBTITLE_COLOR};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    color: ${props => props.theme.TEXT_COLOR};
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

  width: calc(100% - 20px);

  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;

  @media only screen and (max-width: 1023px) {
    height: ${props =>
      props.textOnly ? "calc(50% - 10px)" : "calc(100% - 140px)"};
  }

  @media only screen and (min-width: 1024px) {
    left: 20px;
    width: calc(100% - 360px);
    height: calc(100% - 60px);
    padding: 0;
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

const Embed = styled(EmbedContainer)`
  margin-top: 10px;
  width: calc(100% - 20px);

  div iframe {
    width: 100%;
  }
  > div > iframe {
    width: 100%;
    max-height: 280px;
  }

  > div {
    position: relative !important;
    padding-bottom: 56.25% !important; /* 16:9 */
    height: 0 !important;
  }
  > div > iframe {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  @media only screen and (min-width: 1024px) {
    margin-top: 20px;
    width: calc(100% - 80px);

    > div > iframe {
      width: 100%;
      max-height: 280px;
    }
  }
`;

function EmbedFullscreen({ id, date, embed, content, hideClick, hidePopup }) {
  useEffect(() => {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
    ReactGA.pageview(`/rychle-spravy/${id}`);
  }, []);

  return (
    <Container>
      <Content textOnly={embed.length === 0}>
        <MessageText
          dangerouslySetInnerHTML={{
            __html: date.concat("").concat(content)
          }}
        />
        <Embed markup={embed}>
          <div
            dangerouslySetInnerHTML={{
              __html: embed
            }}
          />
        </Embed>
      </Content>
      <RPanel>
        {onMobile ? (
          <AdSense.Google
            client="ca-pub-2681240380511410"
            slot="3863813186"
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%"
            }}
            layout="in-article"
            format=""
          />
        ) : (
          <TrackedRSpravyPanel />
        )}
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
