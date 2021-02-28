import EmbedContainer from "react-oembed-container";
import parse from "html-react-parser";
import EmbedExorcist from "../EmbedExorcist";

import styled from "styled-components";
import { Fragment } from "react";

import onClient from "../../utils/onClient";
import { POSITION } from "../Ads/positions";
import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
import BContainer from "../../components/BContainer";

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

function AdsInjector({ inputHtml, adsDisallowed }) {
  const nrPars = inputHtml.split("</p>\n\n\n\n").length;
  if (!adsDisallowed && nrPars > 5) {
    return inputHtml.split("</p>\n\n\n\n").map((chunk, i) => (
      <Fragment key={i}>
        {parse(chunk.concat("</p>"))}
        {onClient() && (i + 1) % NR_PARS_BET_ADS === 0 && i + 1 < nrPars ? (
          <BContainer className="nomargins">
            <TrackedPanel
              type={TYPES.BASIC}
              position={POSITION.CONTENT_ARTICLE}
            />
          </BContainer>
        ) : null}
      </Fragment>
    ));
  }
  return parse(inputHtml);
}

function PostContentArea({ article, adsDisallowed }) {
  return (
    <EmbedContainer markup={article}>
      <ArticleDiv>
        <AdsInjector inputHtml={article} adsDisallowed={adsDisallowed} />
      </ArticleDiv>
    </EmbedContainer>
  );
}

export default PostContentArea;
