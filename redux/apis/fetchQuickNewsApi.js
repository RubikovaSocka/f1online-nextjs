import fetch from "isomorphic-fetch";
import { URLS } from "./urls";
const PER_PAGE = 15;
const FIELDS = "_fields=id,type,acf,date";

export default async function fetchQuickNews({ before, after }) {
  const time = `${before || after ? "&" : ""}${
    before ? `before=${before}` : ""
  }${before && after ? "&" : ""}${after ? `after=${after}` : ""}`;

  return await fetch(
    `${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}?per_page=${PER_PAGE}&${FIELDS}${time}`
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
