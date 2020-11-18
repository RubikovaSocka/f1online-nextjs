import * as builder from "xmlbuilder";
import fetchArchiveArticles from "../../redux/apis/fetchArchiveArticlesApi";

const frontendUrl = "https://f1online.sk";

const buildUrlObject = (path, updatedAt) => {
  return {
    loc: { "#text": `${frontendUrl}${path}` },
    lastmod: { "#text": `${updatedAt}+01:00` },
    changefreq: { "#text": "daily" },
    priority: { "#text": "1.0" },
  };
};

const Sitemap = () => null;

Sitemap.getInitialProps = async ({ res }) => {
  try {
    let articles = [];
    for (let i = 1; i < 11; i++) {
      //500 articles
      const batch = await fetchArchiveArticles({
        pageNumber: i,
        perPage: "50",
      });
      console.log(batch);
      articles = articles.concat(batch.articles);
      console.log(articles);
    }

    let feedObject = {
      urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
        url: [],
      },
    };

    for (const item of articles) {
      feedObject.urlset.url.push(
        buildUrlObject(`/clanky/${item.id}/${item.slug}`, item.date)
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
