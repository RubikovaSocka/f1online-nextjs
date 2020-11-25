import EmbedContainer from "react-oembed-container";
import parse from "html-react-parser";
import EmbedExorcist from "../EmbedExorcist";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";

import styled from "styled-components";
import { Fragment } from "react";

const ArticleDiv = styled(EmbedExorcist)`
  font-family: "HK Grotesk";
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  overflow: hidden;

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

function AdsInjector({ inputHtml, adsAllow }) {
  const nrPars = inputHtml.split("</p>\n\n\n\n").length;
  if (adsAllow && nrPars > 5) {
    return inputHtml.split("</p>\n\n\n\n").map((chunk, i) => (
      <Fragment key={i}>
        {parse(chunk.concat("</p>"))}
        {(i + 1) % NR_PARS_BET_ADS === 0 ? (
          <TrackedArtRePanel
            GASpercentage={i > 3 ? 100 : 65}
            report={i === 3}
            changeable={i === 3}
          />
        ) : (
          ""
        )}
      </Fragment>
    ));
  }
  return parse(inputHtml);
}

function PostContentArea({ article, adsAllow }) {
  return (
    <EmbedContainer markup={article}>
      <ArticleDiv>
        <AdsInjector inputHtml={article} adsAllow={adsAllow} />
      </ArticleDiv>
    </EmbedContainer>
  );
}

export default PostContentArea;
