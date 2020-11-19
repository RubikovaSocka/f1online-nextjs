import fetch from "isomorphic-fetch";
import { URLS } from "./urls";
const PER_PAGE = 15;
const FIELDS = "_fields=id,type,acf,date";

async function fetchLiveNews({ before, after, start, end }) {
  console.log(`LIVEB${before} S${start} A${after} E${end}`);
  let timeBlock =
    before && start
      ? `&before=${before}&after=${start}`
      : after && end
      ? `&before=${end}&after=${after}`
      : "";

  return await fetch(
    `${URLS.BASE}${URLS.LIVE_ENDPOINT}?per_page=${PER_PAGE}&${FIELDS}${timeBlock}`
  )
    .then((res) =>
      res.json().then((json) => ({
        headers: res.headers,
        json,
      }))
    )
    .then(({ headers, json }) => ({
      news: json,
      totalNewsCount: headers.get("x-wp-total"),
    }));
}

export { PER_PAGE };
export default fetchLiveNews;
