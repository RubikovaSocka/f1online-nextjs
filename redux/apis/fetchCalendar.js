import axios from "axios";

import { URLS } from "./urls";
const PER_PAGE = 30;
const FIELDS = "_fields=acf,type,id"

export default async function fetchCalendar() {
  return await axios
    .get(`${URLS.BASE}${URLS.CALENDAR_ENDPOINT}?per_page=${PER_PAGE}&${FIELDS}`)
    .then(res => res.data.reverse().map(item => item.acf))
    .catch(err => {
      throw new Error(err.response.data.Error);
    });
}
