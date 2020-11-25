import Link from "next/link";
import Image from "next/image";
import getImageSrc, {
  getImageDimensions,
} from "../../utils/getImagePreview.js";
import styled from "styled-components";
import onClient from "../../utils/onClient.js";

const Container = styled.div`
  width: 100%;
  height: calc(62.5vw - 25px);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  margin-bottom: 20px;

  ${(props) =>
    props.isLoading
      ? `background-color: ${props.theme.FILLER_COLOR};
    
    @media only screen and (max-width: 720px) {
      height: ${Math.floor(((props.width - 40) * 5) / 8)}px;
      width: calc(100vw - 40px);
    }
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

  img {
    width: 100%;
    vertical-align: middle;
    transition: transform 0.3s ease;

    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    color: transparent;
  }
  &:hover img {
    transform: scale(1.05);
  }

  @media only screen and (min-width: 1024px) {
    height: 100%;
    img {
      min-height: 100%;
      min-width: 100%;
      margin: auto;
    }
  }
`;

const Title = styled.h3`
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: calc(100% - 20px);
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
    width: calc(100% - 16px);

    /*line-height: 17px;*/
    scroll-behavior: none;
    font-size: 14px;
    ${(props) =>
      props.top
        ? `font-size: 20px; padding: 11px 15px;  width: calc(100% - 30px);`
        : ""}
  }
`;

function TitleArticlePreview({
  isLoading,
  id,
  slug,
  title,
  better_featured_image,
  top,
}) {
  if (isLoading) {
    return (
      <Container
        width={onClient() ? window.innerWidth : "0"}
        isLoading={true}
      />
    );
  }
  return (
    <Container>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          <Image
            width={
              getImageDimensions(better_featured_image, "medium_large").width
            }
            height={
              getImageDimensions(better_featured_image, "medium_large").height
            }
            src={getImageSrc(better_featured_image, "medium_large")}
            alt={`fotka k článku ${title ? title.rendered : ""}`}
            loading="eager"
            priority={true}
          />
          <Title
            top={top}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
        </a>
      </Link>
    </Container>
  );
}

export default TitleArticlePreview;
