import fetch from "isomorphic-fetch";
import { URLS } from "./urls";
const PER_PAGE = 15;
const FIELDS = "_fields=id,type,acf,date";

async function fetchLiveNews({ before, after, start, end, initialLoad }) {

  const archiveLoading =
    before && start && before.length > 0 && start.length > 0;
  //if autoloading and not initial batch size 100
  const batchSize = initialLoad || archiveLoading ? PER_PAGE : 100;

  let timeBlock = archiveLoading
    ? `&before=${before}&after=${start}`
    : `${after && after.length > 0 ? `&after=${after}` : ""}${
        end && end.length > 0 ? `&before=${end}` : ""
      }`;

  return await fetch(
    `${URLS.BASE}${URLS.LIVE_ENDPOINT}?per_page=${batchSize}&${FIELDS}${timeBlock}`
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
