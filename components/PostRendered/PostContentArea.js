import EmbedContainer from "react-oembed-container";
import EmbedExorcist from "../EmbedExorcist";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

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

  .setFirst p:first-of-type {
    font-weight: 600;
    margin-top: 20px;
  }
`;

const NR_PARS_BET_ADS = 4;

function AdsInjector({ inputHtml }) {
  const nrPars = inputHtml.split("</p>\n\n\n\n").length;
  if (nrPars > 5) {
    return inputHtml.split("</p>\n\n\n\n").map((chunk, i) => (
      <>
        {ReactHtmlParser(chunk.concat("</p>"))}
        {(i + 1) % NR_PARS_BET_ADS === 0 ? (
          <TrackedArtRePanel
            GASpercentage={i > 3 ? 100 : 65}
            report={i === 3}
            changeable={i === 3}
          />
        ) : (
          ""
        )}
      </>
    ));
  }
  return ReactHtmlParser(inputHtml);
}

function PostContentArea({ article }) {
  return (
    <EmbedContainer markup={article}>
      <ArticleDiv>
        <AdsInjector inputHtml={article} />
      </ArticleDiv> 
    </EmbedContainer>
  );
}

export default PostContentArea;
