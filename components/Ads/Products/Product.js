import { useSelector } from "react-redux";
import Filler from "../../Filler";
import ReactGA from "react-ga";

import SideProduct from "./SideProduct";
import ContentProduct from "./ContentProduct";

export const POSITIONS = {
  SIDEBAR: "Product_position_sidebar",
  MAIN: "Product_positioned_main",
};

function Product({ position }) {
  const reduxState = useSelector((state) => state.products);
  const { isLoading, products, error } = reduxState;

  if (isLoading) return <Filler width="100%" height="300px" />;
  if (error) return null;
  const partner = products[Math.floor(Math.random() * products.length)];
  const item = partner.items[Math.floor(Math.random() * partner.items.length)];
  //const item = products[0].items[2];
  const onClickedHandler = () => {
    console.log("Clicked", item.url);
    ReactGA.event({
      category: "partnerEshop",
      action: `eshopEntered`,
      label: `${item.url}`,
    });
  };

  switch (position) {
    case POSITIONS.SIDEBAR:
      return (
        <SideProduct
          onClickCallback={onClickedHandler}
          partnerName={partner.partnerName}
          item={item}
        />
      );
    case POSITIONS.MAIN:
      return (
        <ContentProduct
          onClickCallback={onClickedHandler}
          partnerName={partner.partnerName}
          item={item}
        />
      );
  }
  return null;
}

export default Product;
