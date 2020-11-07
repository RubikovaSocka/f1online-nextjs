import fetch from "isomorphic-fetch";
import { URLS } from "./urls";

const STICKY = "sticky=true&per_page=3";
const NONSTICKY = "sticky=false&per_page=11";
const FIELDS =
  "_fields=id,date,title,slug,better_featured_image.media_details,featured_media";

export default async function fetchArticles() {
  try {
    return await Promise.all([
      fetch(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}&${FIELDS}`),
      fetch(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}&${FIELDS}`)
    ])
      .then(results => Promise.all(results.map(r => r.json())))
      .then(results => results.flat());
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}
