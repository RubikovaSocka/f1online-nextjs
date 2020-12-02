import fetch from "isomorphic-fetch";
import { URLS } from "./urls";

const LIMIT = "limit=5";
const HOURS24 = "freshness=1&range=custom&time_unit=hour&time_quantity=24";
const DAYS3 = "range=custom&time_unit=day&time_quantity=3";
const WEEK = "range=custom&time_unit=day&time_quantity=7";
const FIELDS = "_fields=id,type,title,slug";

export default async function fetchPopularArticles() {
  try {
    return await Promise.all([
      fetch(
        `${URLS.BASE}${URLS.POPULAR_ENDPOINT}?${HOURS24}&${LIMIT}&${FIELDS}`
      ),
      fetch(`${URLS.BASE}${URLS.POPULAR_ENDPOINT}?${DAYS3}&${LIMIT}&${FIELDS}`),
      fetch(`${URLS.BASE}${URLS.POPULAR_ENDPOINT}?${WEEK}&${LIMIT}&${FIELDS}`),
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
