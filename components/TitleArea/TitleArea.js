import TitleArticlePreview from "../TitleArticlePreview";
import styled from "styled-components";
import onClient from "../../utils/onClient";
import onMobile from "../../utils/onMobile";
import TrackedPanel, { TYPES } from "../../components/Ads/TrackedPanel";
import { POSITION } from "../../components/Ads/positions";

const Container = styled.div`
  padding: 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 1024px) {
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

const BContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

function TitleArea({ posts, isLoading }) {
  return (
    <Container>
      <Art0>
        <TitleArticlePreview {...posts[0]} isLoading={isLoading} top />
      </Art0>
      <Art1>
        <TitleArticlePreview {...posts[1]} isLoading={isLoading} />
      </Art1>
      <Art2>
        <TitleArticlePreview {...posts[3]} isLoading={isLoading} />
      </Art2>
      <Art3>
        <TitleArticlePreview {...posts[2]} isLoading={isLoading} />
      </Art3>
      <BContainer>
        {onClient() & onMobile() ? (
          <TrackedPanel
            type={TYPES.INSET}
            position={POSITION.CONTENT_HP_TITLE_AREA}
          />
        ) : null}
      </BContainer>
      <Art4>
        <TitleArticlePreview {...posts[4]} isLoading={isLoading} />
      </Art4>
    </Container>
  );
}

export default TitleArea;
