import React from "react";
import MainArticlePreview from "../MainArticlePreview";
import TitleArticlePreview from "../TitleArticlePreview";

import styled from "styled-components";

const Container = styled.div`
  padding: 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 1024px) {
    //width: calc(100% - 40px);
    width: initial;
    padding: 0 20px;
    display: grid;

    grid-template-columns: auto 232px 19px 232px 19px 226px 19px 226px auto;
    grid-template-rows: 0 141px 19px 141px;
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: auto 246px 20px 246px 20px 240px 20px 240px auto;
    grid-template-rows: 0 150px 20px 150px;
  }
`;

const Art0 = styled.div`
  @media only screen and (min-width: 1024px) {
    grid-column: 2 / span 3;
    grid-row: 2 / span 3;
  }
`;
const Art1 = styled.div`
  @media only screen and (min-width: 1024px) {
    grid-column: 6 / span 1;
    grid-row: 2 / span 1;
  }
`;
const Art2 = styled.div`
  @media only screen and (min-width: 1024px) {
    grid-column: 6 / span 1;
    grid-row: 4 / span 1;
  }
`;
const Art3 = styled.div`
  @media only screen and (min-width: 1024px) {
    grid-column: 8 / span 1;
    grid-row: 2 / span 1;
  }
`;
const Art4 = styled.div`
  @media only screen and (min-width: 1024px) {
    grid-column: 8 / span 1;
    grid-row: 4 / span 1;
  }
`;

function TitleArea({ posts }) {
  if (posts.length === 3) {
    //show for mobile version
    return (
      <Container>
        {posts.map((article, index) => (
          <div key={index}>
            <TitleArticlePreview {...article} />
          </div>
        ))}
      </Container>
    );
  } else if (posts.length === 5) {
    //show desktop version
    return (
      <Container>
        <Art0>
          <MainArticlePreview {...posts[0]} />
        </Art0>
        <Art1>
          <TitleArticlePreview {...posts[1]} />
        </Art1>
        <Art2>
          <TitleArticlePreview {...posts[3]} />
        </Art2>
        <Art3>
          <TitleArticlePreview {...posts[2]} />
        </Art3>
        <Art4>
          <TitleArticlePreview {...posts[4]} />
        </Art4>
      </Container>
    );
  }
  return null;
}

export default TitleArea;
