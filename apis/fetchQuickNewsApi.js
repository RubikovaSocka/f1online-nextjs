import axios from "axios";

import { URLS } from "./urls";

export default async function fetchQuickNews() {
  return await axios
    .get(`${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}`)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
