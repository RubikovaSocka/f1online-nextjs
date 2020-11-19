import fetch from "isomorphic-fetch";

import { URLS } from "./urls";
const FIELDS = "&_fields=acf,type,id";

export default async function fetchProgramme() {
  try {
    return await fetch(
      `${URLS.BASE}${URLS.NEXT_VENUE_ID_ENDPOINT}?per_page=1${FIELDS}`
    )
      .then(res => res.json())
      .then(data =>
        fetch(
          `${URLS.BASE}${URLS.CALENDAR_ENDPOINT}${data[0].acf.calendar_gp_id}`
        )
      )
      .then(res => res.json())
      .then(res => res.acf);
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}
