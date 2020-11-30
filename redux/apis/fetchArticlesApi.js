import fetch from "isomorphic-fetch";
import { URLS } from "./urls";

const STICKY = "sticky=true&per_page=3";
const NONSTICKY = "sticky=false&per_page=11";

export default async function fetchArticles() {
  try {
    return await Promise.all([
      fetch(
        `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}&${URLS.fetchArticles}`
      ),
      fetch(
        `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}&${URLS.fetchArticles}`
      ),
    ])
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((results) => results.flat());
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}
