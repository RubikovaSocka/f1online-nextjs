import axios from "axios";

import { URLS } from "./urls";
const PER_PAGE = 12;

export default async function fetchArchiveArticles(pageNumber, perPage) {
  return await axios
    .get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?page=${pageNumber}&per_page=${perPage}`)
    .then(res => {
      return {
        totalArticlesCount: res.headers["x-wp-total"],
        articles: res.data,
        pageNumber: pageNumber
      };
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
