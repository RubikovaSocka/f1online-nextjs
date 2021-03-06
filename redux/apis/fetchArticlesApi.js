import fetch from "isomorphic-fetch";
import { result } from "lodash";
import { URLS } from "./urls";

const STICKY = "sticky=true&per_page=3";
const NONSTICKY = "sticky=false&per_page=11";

export default async function fetchArticles() {
  console.log(
    `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}&${URLS.fetchArticles}`,
    `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}&${URLS.fetchArticles}`
  );
  try {
    return fetch(
      `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/?per_page=13`
    ).then((res) => res.json());

    return await Promise.all([
      /*fetch(
        `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}&${URLS.fetchArticles}`
      ),
      fetch(
        `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}&${URLS.fetchArticles}`
      ),*/
      fetch(`https://wpadmin.f1online.sk/wp-json/wp/v2/posts/?per_page=13`),
    ])
      /*.then((results) => Promise.all(results.map((r) => r.json())))
      .then((results) => {
        console.log(results);
        return results.flat();
      });*/
      .then((results) => {
        console.log(results.json());
        results.json();
      });
  } catch (e) {
    //console.log("ERROR", e);
    throw new Error(e.response.data.Error);
  }
}
