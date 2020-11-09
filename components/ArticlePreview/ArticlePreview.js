import React from "react";
import Link from "next/link";
import formatDate from "../../utils/dateFormatter.js";
import LazyLoad from "react-lazy-load";
import styled from "styled-components";
import getImageSrc from "../../utils/getImagePreview.js";

const Container = styled.div`
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 4px 0;

  ${props =>
    props.loading
      ? `
    background-color: ${props.theme.FILLER_COLOR};
    overflow: hidden;
    position: relative;
    @keyframes slide {
      0% {transform:translateX(-100%);}
      100% {transform:translateX(100%);}
    }
    :after {
      content:'';
      top:0;
      transform:translateX(100%);
      width:100%;
      height:100%;
      position: absolute;
      z-index:1;
      animation: slide 1s infinite;

      background: ${props.theme.FILLER_SHINE_GRADIENT};
    }
    `
      : ""};

  @media only screen and (min-width: 1024px) {
    width: 100%;
    height: 220px;
    display: inline-block;
    margin: 0 0;

    a {
      width: 100%;
      display: inline-block;
    }
  }

  @media only screen and (min-width: 1280px) {
    height: 210px;
    /**background-color: var(--basic-back-color);*/
  }
`;

const ImgContainer = styled.div`
  height: 60px;
  width: 96px;
  background-color: ${props => props.theme.FILLER_COLOR};
  position: relative;
  overflow: hidden;

  background-color: ${props => props.theme.FILLER_COLOR};
  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  :after {
    content: "";
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: slide 1s infinite;

    background: ${props => props.theme.FILLER_SHINE_GRADIENT};
  }
  img {
    position: absolute;
    height: 100%;
    min-width: 100%;
    cursor: pointer;

    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    color: transparent;
    z-index: 2;
  }

  @media only screen and (min-width: 1024px) {
    width: 100%;
    height: 123px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;
      min-height: 100%;
      height: auto;
    }
  }

  @media only screen and (min-width: 1280px) {
    height: 130px;
  }
`;

const TitleContainer = styled.a`
  width: calc(100% - 89px);
  font-family: "Cabin";
  margin-left: 7px;

  @media only screen and (min-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-left: 0;
  }
`;

const Title = styled.h3`
  margin: 0;
  color: ${props => props.theme.TEXT_COLOR_MILD};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 3px;
  }
`;

const Date = styled.span`
  display: none;

  @media only screen and (min-width: 1024px) {
    display: inline-block;
    margin-top: 5px;
    color: ${props => props.theme.SUBTITLE_COLOR};

    font-size: 13px;
    font-weight: 400;
    font-family: "HK Grotesk", "Source Sans Pro";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;

function ArticlePreview(props) {
  const { isLoading, id, slug, title, date, better_featured_image } = props;
  if (isLoading) {
    return <Container loading />;
  }
  return (
    <Container>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          <ImgContainer>
            <LazyLoad height="100%" width="100%">
              <img
                alt={`${title ? title.rendered : ""}`}
                src={getImageSrc(better_featured_image, "medium")}
              />
            </LazyLoad>
          </ImgContainer>
        </a>
      </Link>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <TitleContainer>
          <Title dangerouslySetInnerHTML={{ __html: title.rendered }} />
          {/*<h3 className={styles.title}>{title.rendered}</h3>*/}
          <Date>{formatDate(date)}</Date>
        </TitleContainer>
      </Link>
    </Container>
  );
}

export default ArticlePreview;
