import fetch from "isomorphic-fetch";
import { URLS } from "./urls";
const PER_PAGE = 15;
const FIELDS = "_fields=acf,date";

export default async function fetchQuickNews(pageNumber) {
  return await fetch(
    `${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}?page=${pageNumber}&per_page=${PER_PAGE}&${FIELDS}`
  )
    .then(res =>
      res.json().then(json => ({
        headers: res.headers,
        json
      }))
    )
    .then(({ headers, json }) => ({
      news: json,
      totalNewsCount: headers.get("x-wp-total")
    }));
}
