import axios from "axios";

import { URLS } from "./urls";

export default async function fetchArticles() {
  return await axios
    .get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}`)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
