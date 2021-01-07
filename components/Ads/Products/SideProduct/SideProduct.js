import {
  Container,
  ImageContainer,
  DetailBlock,
  PartnerName,
  Title,
  PriceContainer,
  Price,
  RegularPrice,
  Button,
} from "../BaseStyles";

function SideProduct({ onClickCallback, item, partnerName }) {
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

export default SideProduct;
