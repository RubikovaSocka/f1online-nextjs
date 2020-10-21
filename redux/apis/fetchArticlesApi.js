import axios from "axios";

import { URLS } from "./urls";

const STICKY = "sticky=true&per_page=3";
const NONSTICKY = "sticky=false&per_page=11";

export default async function fetchArticles() {
  return await axios
    .all([
      axios.get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${STICKY}`),
      axios.get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?${NONSTICKY}`)
    ])
    .then(res => {
      return [...res[0].data, ...res[1].data];
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
