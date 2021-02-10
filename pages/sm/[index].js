import * as builder from "xmlbuilder";
import fetchArchiveArticles from "../../redux/apis/fetchArchiveArticlesApi";

const frontendUrl = "https://f1online.sk";

const buildUrlObject = (path, updatedAt, frequency) => {
  return {
    loc: { "#text": `${frontendUrl}${path}` },
    lastmod: { "#text": `${updatedAt}+01:00` },
    changefreq: { "#text": `${frequency}` },
    priority: { "#text": "1.0" },
  };
};

const Sitemap = () => null;

Sitemap.getInitialProps = async ({ res, query }) => {
  const { index } = query;
  const indexInt = parseInt(index);
  try {
    let articles = [];
    let nrPages = null;
    let lowPage = 10 * (indexInt - 1) + 1;
    let highPageIncluding = 10 * indexInt;

    for (let i = lowPage; i < highPageIncluding + 1; i++) {
      //500 articles

      if (!nrPages || (nrPages && i <= nrPages)) {
        const batch = await fetchArchiveArticles({
          pageNumber: i,
          perPage: "50",
        });
        nrPages = Math.ceil(batch.totalArticlesCount / 50);
        articles = articles.concat(batch.articles);
      }
    }

    let feedObject = {
      urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
        url: [],
      },
    };

    let counter = 0;
    for (const item of articles) {
      counter++;
      feedObject.urlset.url.push(
        buildUrlObject(
          `/clanky/${item.id}/${item.slug}`,
          item.date,
          indexInt > 1
            ? "monthly"
            : counter < 20
            ? "hourly"
            : counter < 80
            ? "daily"
            : "monthly"
        )
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
