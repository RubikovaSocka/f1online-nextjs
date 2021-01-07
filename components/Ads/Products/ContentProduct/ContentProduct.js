import React, { useRef, useState } from "react";
import styled from "styled-components";

import {
  Container as ContainerBase,
  ImageContainer as ImageContainerBase,
  DetailBlock as DetailBlockBase,
  PartnerName,
  Title,
  PriceContainer,
  Price,
  RegularPrice,
  Button,
} from "../BaseStyles";

const Container = styled(ContainerBase)`
  margin: 20px 0;
  @media only screen and (min-width: 720px) {
    flex-direction: row;
    justify-content: center;
    padding: 0;

    span,
    a {
      text-align: start;
    }
  }
`;

const ImageContainer = styled(ImageContainerBase)`
  @media only screen and (min-width: 720px) {
    width: 50%;
    padding-right: 10px;
    img {
      margin: 0 0 0 auto;
    }
  }
`;

const DetailBlock = styled(DetailBlockBase)`
  @media only screen and (min-width: 720px) {
    width: 50%;
    padding: 5px 5px 5px 10px;
    align-items: flex-start;
  }
`;

function ContentProduct({ onClickCallback, item, partnerName }) {
  return (
    <Container
      onClick={() => onClickCallback()}
      rel="nofollow"
      target="_blank"
      href={item.url}
    >
      <ImageContainer>
        <img src={item.img} />
      </ImageContainer>
      <DetailBlock>
        <PartnerName>{partnerName}</PartnerName>
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
      </DetailBlock>
    </Container>
  );
}

export default ContentProduct;
