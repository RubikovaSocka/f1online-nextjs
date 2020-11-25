import fetch from "isomorphic-fetch";
import { URLS } from "./urls";

const LIMIT = "limit=5";
const HOURS24 = "range=last24hours";
const DAYS3 = "range=custom&time_unit=day&time_quantity=3";
const WEEK = "range=last7days";

export default async function fetchPopularArticles() {
  console.log("FETCHING ARTICES \n\n\n\n");
  try {
    return await Promise.all([
      fetch(
        `${URLS.BASE}${URLS.POPULAR_ENDPOINT}?${HOURS24}&${LIMIT}&${URLS.previewFields}`
      ),
      fetch(
        `${URLS.BASE}${URLS.POPULAR_ENDPOINT}?${DAYS3}&${LIMIT}&${URLS.previewFields}`
      ),
      fetch(
        `${URLS.BASE}${URLS.POPULAR_ENDPOINT}?${WEEK}&${LIMIT}&${URLS.previewFields}`
      ),
    ])
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((results) => ({
        today: results[0],
        days: results[1],
        week: results[2],
      }));
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}
