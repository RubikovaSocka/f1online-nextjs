import fetch from "isomorphic-fetch";
import { URLS } from "./urls";

const STICKY = "sticky=true&per_page=3";
const NONSTICKY = "sticky=false&per_page=11";

function flatten(array) {
  if (array.length == 0) return array;
  else if (Array.isArray(array[0]))
    return flatten(array[0]).concat(flatten(array.slice(1)));
  else return [array[0]].concat(flatten(array.slice(1)));
}

export default async function fetchArticles() {
  try {
    return await Promise.all([
      fetch(
        `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}&${URLS.previewFields}`
      ),
      fetch(
        `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}&${URLS.previewFields}`
      ),
    ])
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((results) => {
        console.log(flatten(results));
        return flatten(results);
      });
  } catch (e) {
    console.log("ERROR", e);
    throw new Error(e.response.data.Error);
  }
}
