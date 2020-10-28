import axios from "axios";

import { URLS } from "./urls";

const FIELDS = "&_fields=acf"

export default async function fetchProgramme() {
  let nextVenueData = await axios.get(
    `${URLS.BASE}${URLS.NEXT_VENUE_ID_ENDPOINT}?per_page=1${FIELDS}`
  );
  let nextVenueId = nextVenueData.data[0].acf.calendar_gp_id;
  return await axios
    .get(`${URLS.BASE}${URLS.CALENDAR_ENDPOINT}${nextVenueId}`)
    .then(res => res.data.acf)
    .catch(err => {
      throw new Error(err.response.data.Error);
    });
}
