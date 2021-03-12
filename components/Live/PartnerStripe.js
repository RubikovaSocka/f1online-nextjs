import React from "react";
import styled from "styled-components";
import ReactGA from "react-ga";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px 25px 20px;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }

  color: ${(props) => props.fgColor};
  background-color: ${(props) => props.bgColor};
  font-family: HK Grotesk;
  font-size: 15px;

  img {
    margin: 0;

    width: auto;
    height: 50px;
    @media only screen and (min-width: 1024px) {
      margin-left: 15px;
      height: 45px;
    }
  }
  a {
    color: ${(props) => props.fgColor};
  }
`;
const Message = styled.span`
  color: white;
  text-align: center;
  margin: 0;
  font-weight: 600;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

export default function PartnerStripe({ state }) {
  if (state.isLoading) return null;
  const title = state.adsData.title.rendered;
  const {
    logo,
    partner_main_color: bgColor,
    partner_font_color: fgColor,
    title: stripeMessage,
    partner_homepage: partnerHomepage,
  } = state.adsData.acf;

  const stripeClick = (targetLink) => {
    // console.log("CLICKED", {
    //   category: "online-click",
    //   action: `${title.replace(" ", "-")}`,
    //   label: `STRIPE-${targetLink}`,
    //   nonInteraction: false,
    // });
    ReactGA.event({
      category: "online-click",
      action: `${title.replace(" ", "-")}`,
      label: `STRIPE-${targetLink}`,
      nonInteraction: false,
    });
  };

  return (
    <Container bgColor={bgColor} fgColor={fgColor}>
      <a
        target="_blank"
        onClick={() => stripeClick(partnerHomepage)}
        href={partnerHomepage}
      >
        <Message>{stripeMessage}</Message>
      </a>
      <a
        target="_blank"
        onClick={() => stripeClick(partnerHomepage)}
        href={partnerHomepage}
      >
        <img src={logo} />
      </a>
    </Container>
  );
}
