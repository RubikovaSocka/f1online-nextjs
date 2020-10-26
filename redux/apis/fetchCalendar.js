import axios from "axios";

import { URLS } from "./urls";

export default async function fetchCalendar(perPage) {
  return await axios
    .get(`${URLS.BASE}${URLS.CALENDAR_ENDPOINT}?per_page=${perPage}`)
    .then(res => res.data.map(item => item.acf))
    .catch(err => {
      throw new Error(err.response.data.Error);
    });
}
