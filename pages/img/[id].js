import React from "react";
import { wrapper } from "../../redux/store/store";
import { URLS } from "../../redux/apis/urls";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 1000px;
  z-index: 500;
`;
const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
`;
const Content = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6544817756204044) 0%,
    rgba(213, 213, 213, 0.660084016516763) 71%,
    rgba(207, 207, 207, 0.8421568456484156) 81%,
    rgba(205, 205, 205, 0.8701680501302084) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const MessageContainer = styled.div`
  width: calc(100vw - 100px);
  height: 510px;

  padding: 0 50px;
  display: flex;
`;
const Message = styled.div`
  font-family: HK Grotesk;
  font-size: ${(props) => (props.small ? "38px" : "48px")};
  z-index: 501;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    text-align: center;
    margin: 15px 0;
    line-height: 60px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 50px);
  height: 115px;
`;
const Logo = styled.img`
  height: 80px;
`;

export default function rp({ newsItem }) {
  console.log(newsItem);
  const obsah =
    newsItem.acf.hasvideo && newsItem.acf.hasvideo === "Áno"
      ? `<p>VIDEO: ${newsItem.acf.obsah_rychlej_spravy.split("<p>")[1]}`
      : newsItem.acf.obsah_rychlej_spravy;
  console.log(obsah);
  console.log(obsah.length);
  const smallFont = obsah.length > 200;
  return (
    <Container>
      <BackgroundImage src="https://wpadmin.f1online.sk/wp-content/uploads/M255604-1.jpg" />
      <Content>
        <MessageContainer>
          <Message
            small={smallFont}
            dangerouslySetInnerHTML={{
              __html: obsah,
            }}
          />
        </MessageContainer>
        <LogoContainer>
          <Logo src="/images/logo-light.png" />
        </LogoContainer>
      </Content>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params }) => {
    const response = await fetch(
      `${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}${params.id}?_fields=id,type,acf,date`
    )
      .then((res) => res.json())
      .then((res) => res);

    return {
      props: {
        newsItem: response,
      },
    };
  }
);
