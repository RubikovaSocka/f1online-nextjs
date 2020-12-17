import { URLS } from "./urls";

const fetchProducts = async () => {
  return await fetch(`${URLS.products}`)
    .then((res) => res.json())
    .then((res) =>
      res.map((item) => ({
        img: item.obrazok,
        price: item.cena,
        title: item.nazov,
        url: item.url,
      }))
    );
};

export default fetchProducts;
