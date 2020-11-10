import axios from "axios";

import { URLS } from "./urls";
const FIELDS = "_fields=id";

export default async function getTagIdFromTagSlug(tagSlug) {
  let response = await axios.get(
    `${URLS.BASE}${URLS.TAGS_ENDPOINT}?slug=${tagSlug}&${FIELDS}`
  );
  return response.data[0].id;
}
