import EmbedContainer from "react-oembed-container";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";
import styled from "styled-components";
import EmbedExorcist from '../EmbedExorcist'

const ArticleDiv = styled(EmbedExorcist)`
  font-family: "HK Grotesk";
  font-size: 16px;
  line-height: 28px;
  color: ${props => props.theme.TEXT_COLOR_MILD};
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

function InjectAds({ article }) {
  let nrOfParagraphs = (article.match(/<p>/g) || []).length;
  let delimiter = "<p>";
  const nrPsBetween = 4;

  //Don't show ads
  if (nrOfParagraphs < 6) {
    return (
      <ArticleDiv
        className="setFirst"
        dangerouslySetInnerHTML={{ __html: article }}
      />
    );
    //Show ads
  } else if (nrOfParagraphs === 6) {
    let counter = 0;
    return (
      <>
        {article.split(delimiter).map((paragraph, index) => {
          counter++;
          return index > 0 ? (
            <div key={counter}>
              <ArticleDiv
                className={`${index === 1 ? "setFirst" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: "<p>".concat(paragraph)
                }}
              />
              {index === 3 ? (
                <TrackedArtRePanel report={true} changeable={false} />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          );
        })}
      </>
    );
  } else {
    let counter = 0;
    return (
      <>
        {article.split(delimiter).map((paragraph, index) => {
          counter++;
          return index > 0 ? (
            <div key={counter}>
              <ArticleDiv
                className={`${index === 1 ? "setFirst" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: "<p>".concat(paragraph)
                }}
              />
              {(index - 1) % nrPsBetween === 3 &&
              nrOfParagraphs - (index - 1) > 2 ? (
                <TrackedArtRePanel
                  GASpercentage={index > 4 ? 100 : 65}
                  report={index === 4}
                  changeable={index === 4}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          );
        })}
      </>
    );
  }
}

function PostContentArea({ article }) {
  return (
    <EmbedContainer markup={article}>
      <InjectAds article={article} />
    </EmbedContainer>
  );
}

export default PostContentArea;
