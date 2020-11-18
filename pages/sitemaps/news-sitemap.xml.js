import * as builder from "xmlbuilder";
import fetchArchiveArticles from "../../redux/apis/fetchArchiveArticlesApi";

const frontendUrl = "https://f1online.sk";

const buildUrlObject = (path, updatedAt, title) => {
  return {
    loc: { "#text": `${frontendUrl}${path}` },
    //lastmod: { "#text": updatedAt.split("T")[0] },
    //changefreq: { "#text": "daily" },
    //priority: { "#text": "1.0" },
    ["news:news"]: {
      ["news:publication"]: {
        ["news:name"]: { "#text": "F1online.sk" },
        ["news:language"]: { "#text": "sk" },
      },
      ["news:publication_date"]: { "#text": updatedAt },
      ["news:title"]: { "#text": title.rendered },
    },
  };
};

const Sitemap = () => null;

Sitemap.getInitialProps = async ({ res }) => {
  try {
    /*
    
    let articles = [];
    for (let i = 1; i < 2; i++) {
      const batch = await fetchArchiveArticles({
        pageNumber: i,
        perPage: "60",
      });
      console.log(batch);
      articles = articles.concat(batch.articles);
      console.log(articles);
    }
    
    */

    const articles = await fetchArchiveArticles({
      pageNumber: 1,
      perPage: "100",
    });

    /*let feedObject = {
      urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
        url: [],
      },
    };*/
    let feedObject = {
      urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
        url: [],
      },
    };

    for (const item of articles.articles) {
      feedObject.urlset.url.push(
        buildUrlObject(`/clanky/${item.id}/${item.slug}`, item.date, item.title)
      );
    }

    const sitemap = builder.create(feedObject, { encoding: "utf-8" });

    if (res) {
      res.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate");
      res.setHeader("Content-Type", "application/xml");
      res.statusCode = 200;
      res.end(sitemap.end({ pretty: true }));
    }

    return;
  } catch (error) {
    return { error: 404 };
  }
};

export default Sitemap;
