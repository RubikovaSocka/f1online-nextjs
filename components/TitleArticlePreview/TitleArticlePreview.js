import React from "react";
import Link from "next/link";
import getImagePreview from "../../utils/getImagePreview.js";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  margin-bottom: 20px;

  img {
    width: 100%;
    vertical-align: middle;
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }

  @media only screen and (min-width: 1024px) {
    height: 141px;

    img {
      min-height: 100%;
      min-width: 100%;
      margin: auto;
    }
  }

  @media only screen and (min-width: 1280px) {
    height: 150px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 72px;
  bottom: 0px;
  margin: 0;

  position: absolute;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  @media only screen and (min-width: 1024px) {
    height: 82px;
  }
`;

const Title = styled.h3`
  padding: 10px;
  margin: 0;

  font: 700 17px "Cabin", "Source Sans Pro";

  text-align: start;
  color: white;
  text-shadow: 1px 1px 2px black;

  background: linear-gradient(
    0deg,
    rgba(1, 1, 1, 0.95) 0%,
    rgba(1, 1, 1, 0.75) 20%,
    rgba(0, 0, 0, 0.5) 75%,
    rgba(0, 0, 0, 0) 100%
  );

  @media only screen and (min-width: 1024px) {
    padding: 8px 9px;

    line-height: 17px;
    scroll-behavior: none;
    font-size: 14px;
  }
`;

function TitleArticlePreview({ id, slug, title, better_featured_image }) {
  return (
    <Container>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          {getImagePreview({
            imgData: better_featured_image,
            imgSize: "medium_large"
          })}
          <TitleContainer>
            <Title dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </TitleContainer>
        </a>
      </Link>
    </Container>
  );
}

export default TitleArticlePreview;
