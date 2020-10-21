import axios from "axios";

import { URLS } from "./urls";
const PER_PAGE = 15;

export default async function fetchQuickNews(pageNumber) {
  return await axios
    .get(`${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}?page=${pageNumber}&per_page=${PER_PAGE}`)
    .then(res => {
      return {
        totalNewsCount: res.headers["x-wp-total"],
        news: res.data
      };
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
