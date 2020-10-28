import axios from "axios";

import { URLS } from "./urls";

const STICKY = "sticky=true&per_page=3";
const NONSTICKY = "sticky=false&per_page=11";
const FIELDS = "_fields=id,date,title,slug,better_featured_image.media_details,featured_media"

export default async function fetchArticles() {
  return await axios
    .all([
      axios.get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}&${FIELDS}`),
      axios.get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}&${FIELDS}`)
    ])
    .then(res => {
      return [...res[0].data, ...res[1].data];
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
