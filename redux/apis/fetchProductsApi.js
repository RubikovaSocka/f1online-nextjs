import { URLS } from "./urls";

const fetchProducts = async () => {
  try {
    return await Promise.all([
      fetch(`${URLS.formulastore}`),
      fetch(`${URLS.blogokave}`),
    ])
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((results) => [
        {
          partnerName: "Formulastore.sk",
          items: results[0].map((item) => ({
            img: item.obrazok,
            price: item.cena,
            sale_price: item.cena,
            on_sale: false,
            visible: true,
            title: item.nazov,
            url: item.url,
          })),
        },
        {
          partnerName: "Blogokave.sk",
          items: results[1].products.map((item) => ({
            img: item.images[0].src,
            price: item.regular_price,
            sale_price: item.sale_price,
            on_sale: item.on_sale,
            visible: item.visible,
            title: item.title,
            url: item.permalink,
          })),
        },
      ]);
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
};

export default fetchProducts;
