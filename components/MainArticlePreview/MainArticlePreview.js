import Link from "next/link";
import styled from "styled-components";
import getImageSrc from "../../utils/getImagePreview.js";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  z-index: 0;
  margin-bottom: 20px;

  &:hover img {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: middle;
    transition: transform 0.3s ease;
  }

  @media only screen and (min-width: 1024px) {
    height: 301px;
    margin: 0;

    img {
      min-width: 100%;
      min-height: 100%;
      margin: auto;
    }
  }

  @media only screen and (min-width: 1280px) {
    height: 320px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 70px;
  bottom: 0;
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
  padding: 12px;
  margin: 0;
  color: white;
  text-align: start;
  text-shadow: 2px 2px 2px black;
  font: 700 17px "Cabin", "Source Sans Pro";

  background: linear-gradient(
    0deg,
    rgba(1, 1, 1, 0.95) 0%,
    rgba(1, 1, 1, 0.75) 20%,
    rgba(0, 0, 0, 0.5) 75%,
    rgba(0, 0, 0, 0) 100%
  );

  @media only screen and (min-width: 1024px) {
    padding: 11px 15px;
    font-size: 20px;
  }
`;

function MainArticlePreview({ id, slug, better_featured_image, title }) {
  console.log(better_featured_image)
  return (
    <Container>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          <img
            alt={`fotka k článku ${title.rendered}`}
            src={getImageSrc(better_featured_image, "medium_large")}
          />
          <TitleContainer>
            <Title dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </TitleContainer>
        </a>
      </Link>
    </Container>
  );
}

export default MainArticlePreview;
