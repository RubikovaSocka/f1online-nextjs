import React from "react";
import Link from "next/link";
import Image from "next/image";
import formatDate from "../../utils/dateFormatter.js";
import styled from "styled-components";
import getImageSrc, {
  getImageDimensions,
} from "../../utils/getImagePreview.js";

const Container = styled.div`
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 4px 0;

  ${(props) =>
    props.isLoading
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
  background-color: ${(props) => props.theme.FILLER_COLOR};
  position: relative;
  overflow: hidden;

  > div {
    height: 100%;
    width: 100%;
  }

  background-color: ${(props) => props.theme.FILLER_COLOR};
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

    background: ${(props) => props.theme.FILLER_SHINE_GRADIENT};
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
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  font-size: 14px;
  cursor: pointer;

  ${(props) =>
    props.hasVideo
      ? `&:before {
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          -webkit-font-smoothing: antialiased;
          margin-right: 4px;
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          color: #e10600;
          content: "\f144";
        }`
      : null}

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
    color: ${(props) => props.theme.SUBTITLE_COLOR};

    font-size: 13px;
    font-weight: 400;
    font-family: "HK Grotesk", "Source Sans Pro";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;

const FlickeringImage = styled(Image)``;

function ArticlePreview(props) {
  const { isLoading, id, slug, title, date, tags, better_featured_image } = props;
  if (isLoading) {
    return <Container isLoading={true} />;
  }
  return (
    <Container>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          <ImgContainer>
            <FlickeringImage
              key={id}
              width={getImageDimensions(better_featured_image, "medium").width}
              height={
                getImageDimensions(better_featured_image, "medium").height
              }
              src={getImageSrc(better_featured_image, "medium")}
              alt={`fotka k článku ${title ? title.rendered : ""}`}
              loading="lazy"
            />
          </ImgContainer>
        </a>
      </Link>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`} passHref>
        <TitleContainer>
          <Title hasVideo={tags.includes(209)} dangerouslySetInnerHTML={{ __html: title.rendered }} />
          {/*<h3 className={styles.title}>{title.rendered}</h3>*/}
          <Date>{formatDate(date)}</Date>
        </TitleContainer>
      </Link>
    </Container>
  );
}

export default ArticlePreview;
