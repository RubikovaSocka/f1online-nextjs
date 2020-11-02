import axios from "axios";

import { URLS } from "./urls";
const PER_PAGE = 12;
const FIELDS =
  "_fields=id,date,title,slug,better_featured_image.media_details,featured_media";

export default async function fetchArchiveArticles({
  pageNumber,
  perPage,
  tagID,
  searchPhrase
}) {
  const TAG = tagID ? `&tags=${tagID}` : "";
  const SEARCH = searchPhrase && !tagID ? `&search=${searchPhrase.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}` : "";

  return await axios
    .get(
      `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}?page=${pageNumber}&per_page=${perPage}&${FIELDS}${TAG}${SEARCH}`
    )
    .then(res => {
      return {
        totalArticlesCount: res.headers["x-wp-total"],
        articles: res.data,
        pageNumber: pageNumber
      };
    })
    .catch(error => {
      throw new Error(error.response.data.Error);
    });
}
