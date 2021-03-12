import EmbedContainer from "react-oembed-container";
import parse from "html-react-parser";
import EmbedExorcist from "../EmbedExorcist";

import styled from "styled-components";
import { Fragment } from "react";

import onClient from "../../utils/onClient";
import { POSITION } from "../Ads/positions";
import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
import BContainer from "../../components/BContainer";

import ReactGA from "react-ga";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px 25px 20px;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }

  color: ${(props) => props.fgColor};
  background-color: ${(props) => props.bgColor};
  font-family: HK Grotesk;
  font-size: 15px;

  img {
    margin: 0;

    width: auto;
    height: 50px;
    @media only screen and (min-width: 1024px) {
      margin-left: 15px;
      height: 45px;
    }
  }
  a {
    color: ${(props) => props.fgColor};
  }
`;
const Message = styled.span`
  color: white;
  text-align: center;
  margin: 0;
  font-weight: 600;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

const ArticleDiv = styled(EmbedExorcist)`
  font-family: "HK Grotesk";
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  overflow: hidden;
  overflow: visible; /*updated to show banners*/

  p {
    padding: 3px 0;
    margin: 8px 0;
  }
  a {
    text-decoration: none;
    color: #e10600;
  }

  p:first-of-type {
    font-weight: 600;
    margin-top: 20px;
  }
`;

const NR_PARS_BET_ADS = 4;

function AdsInjector({ inputHtml, adsDisallowed, tags }) {
  const stripeClick = (targetLink) => {
    // console.log("CLICKED", {
    //   category: "ARTICLE-STRIPE-CLICK",
    //   action: `Predsezónne-testy:-Bonipo.sk`,
    //   label: `${window.location.href}`,
    //   nonInteraction: false,
    // });
    ReactGA.event({
      category: "ARTICLE-STRIPE-CLICK",
      action: `Predsezónne-testy:-Bonipo.sk`,
      label: `${window.location.href}`,
      nonInteraction: false,
    });
  };

  const nrPars = inputHtml.split("\n\n\n\n").length;

  if (!adsDisallowed && nrPars > 5) {
    return inputHtml.split("\n\n\n\n").map((chunk, i) => (
      <Fragment key={i}>
        {parse(chunk)}
        {onClient() && tags.includes(389) && i === 0 && (
          <Container bgColor="#0597F2" fgColor="#ffffff">
            <a
              target="_blank"
              onClick={() => stripeClick("https://bonipo.sk/")}
              href="https://bonipo.sk/"
            >
              <Message>
                Články k predsezónnym testom vznikajú vďaka podpore nášho
                partnera Bonipo.sk. Ďakujeme za podporu formulovej komunity u
                nás!
              </Message>
            </a>
            <a
              target="_blank"
              onClick={() => stripeClick("https://bonipo.sk/")}
              href="https://bonipo.sk/"
            >
              <img src="https://wpadmin.f1online.sk/wp-content/uploads/logo-boniposk.png" />
            </a>
          </Container>
        )}
        {onClient() && (i + 1) % NR_PARS_BET_ADS === 0 && i + 1 < nrPars && (
          <BContainer className="nomargins">
            <TrackedPanel
              type={TYPES.BASIC}
              position={POSITION.CONTENT_ARTICLE}
            />
          </BContainer>
        )}
      </Fragment>
    ));
  }
  return parse(inputHtml);
}

function PostContentArea({ article, adsDisallowed, tags }) {
  return (
    <EmbedContainer markup={article}>
      <ArticleDiv>
        <AdsInjector
          inputHtml={article}
          tags={tags}
          adsDisallowed={adsDisallowed}
        />
      </ArticleDiv>
    </EmbedContainer>
  );
}

export default PostContentArea;
