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
            on_sale: item.stara_cena !== "0,00",
            price: item.stara_cena !== "0,00" ? item.stara_cena : item.cena,
            sale_price: item.cena,
            visible: true,
            title: item.nazov,
            url: item.url,
          })),
        },
        {
          partnerName: "Blogokave.sk",
          items: results[1].products.map((item) => ({
            img: item.images[0].src,
            on_sale: item.on_sale,
            price: item.regular_price,
            sale_price: item.sale_price,
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
