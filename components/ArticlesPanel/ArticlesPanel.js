import ArticlePreview from "../ArticlePreview";
import TrackedArtRePanel from "../Ads/TrackedArtRePanel";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (min-width: 1024px) {
    margin-top: 20px;
    margin-bottom: initial;
    height: initial;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 1280px) {
    margin-top: 20px;
  }

  i {
    width: 100%;

    @media only screen and (min-width: 1024px) {
      width: 198px;
    }

    @media only screen and (min-width: 1280px) {
      width: 211px;
    }
  }
`;

const ArticleContainer = styled.div`
  width: 100%;
  margin-bottom: 5px;

  @media only screen and (min-width: 1024px) {
    width: 198px;
    margin-bottom: 20px;
  }

  @media only screen and (min-width: 1280px) {
    width: 211px;
  }
`;

function ArticlesPanel({ posts, isLoading }) {
  console.log("ARTICLES PPANEL")
  console.log(posts)
  if (posts.length > 6) {
    return (
      <>
        <Container>
          {posts.slice(0, 6).map((post, index) => (
            <ArticleContainer key={index}>
              <ArticlePreview isLoading={isLoading} {...post} />
            </ArticleContainer>
          ))}
          {/* Fill empty space (on right) in rows with less than 3 posts*/}
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
        </Container>
        <div /*counter={counter}*/ style={{ width: "100%" }}>
          <TrackedArtRePanel changeable={true} report={true} />
        </div>
        <Container>
          {posts.slice(6, 12).map((post, index) => (
            <ArticleContainer key={index}>
              <ArticlePreview isLoading={isLoading} {...post} />
            </ArticleContainer>
          ))}
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
        </Container>
      </>
    );
  }
  return (
    <Container>
      {posts.map((post, index) => (
        <ArticleContainer key={index}>
          <ArticlePreview isLoading={isLoading} {...post} />
        </ArticleContainer>
      ))}
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
    </Container>
  );
}

export default ArticlesPanel;
