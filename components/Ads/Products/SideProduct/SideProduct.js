import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Filler from "../../../Filler";
import ReactGA from "react-ga";

const Container = styled.a`
  //background-color: blue;
  width: 100%;

  display: flex;
  flex-direction: column;
  padding: 0 0 12px 0;

  box-shadow: ${(props) => props.theme.PRODUCT_PANEL_SHADOW};
  cursor: pointer;
  span,
  a {
    font-family: HK Grotesk;
    text-align: center;
  }
  //border: 1px solid white;
  &:hover {
    border-color: black;
  }
`;

const ImageContainer = styled.div`
  width: calc(100% - 10px);
  padding: 5px;
  background-color: white;
  display: flex;
  min-height: 170px;

  img {
    //width: 100%;
    margin: auto;
    margin: 0 auto;
    max-width: 100%;
    max-height: 200px;
  }
`;

const PartnerName = styled.span`
  margin-top: 7px;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${(props) => props.theme.SUBTITLE_COLOR};
  //background: blue;
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin: auto;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  &:hover {
    text-decoration: underline;
  }
`;
const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #e10600;

  &::after {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 700;
    content: "\f153";
    font-size: 14px;
    line-height: 21px;
  }
`;

const RegularPrice = styled(Price)`
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  font-weight: 600;
  text-decoration: line-through;
  margin-right: 15px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.button`
  margin: auto;
  margin-top: 10px;
  height: 40px;
  //width: 140px;
  padding: 0 13px;
  border: 1px solid ${(props) => props.theme.TEXT_COLOR_MILD};
  border-radius: 0px;
  font-family: "HK Grotesk", "Source Sans Pro";
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  background-color: ${(props) => props.theme.PAGE_BACK_COLOR};

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  transition: ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.TEXT_COLOR_MILD};
    color: ${(props) => props.theme.PAGE_BACK_COLOR};
  }
  &::after {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 700;
    content: "\f35d";
    margin-left: 5px;
    font-size: 12px;
  }
`;

export default function SideProduct() {
  const state = useSelector((state) => state.products);
  const { isLoading, products, error } = state;
  //console.log(state);
  if (isLoading) return <Filler width="100%" height="300px" />;
  if (error) return null;
  const partner = products[Math.floor(Math.random() * products.length)];
  const item = partner.items[Math.floor(Math.random() * partner.items.length)];
  //const item = products[1].items[2];
  return (
    <Container
      onClick={() => {
        ReactGA.event({
          category: "partnerEshop",
          action: `eshopEntered`,
          label: `${item.url}`,
        });
      }}
      rel="nofollow"
      target="_blank"
      href={item.url}
    >
      <ImageContainer>
        <img src={item.img} />
      </ImageContainer>

      <PartnerName>{partner.partnerName}</PartnerName>

      <Title>{item.title}</Title>
      {item.on_sale ? (
        <PriceContainer>
          <RegularPrice>{item.price.replace(".", ",")}&nbsp;</RegularPrice>
          <Price>{item.sale_price.replace(".", ",")}&nbsp;</Price>
        </PriceContainer>
      ) : (
        <Price>{item.price.replace(".", ",")}&nbsp;</Price>
      )}

      <Button>
        <span>Do Eshopu</span>
      </Button>
    </Container>
  );
}
