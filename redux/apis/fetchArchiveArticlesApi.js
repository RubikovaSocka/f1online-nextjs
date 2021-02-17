import fetch from "isomorphic-fetch";

import { URLS } from "./urls";
const PER_PAGE = 12;

export default async function fetchArchiveArticles({
  pageNumber,
  perPage,
  tagID,
  searchPhrase,
  authorId,
}) {
  const TAG = tagID ? `&tags=${tagID}` : "";
  const SEARCH =
    searchPhrase && !tagID
      ? `&search=${searchPhrase
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")}`
      : "";

  const url = `${URLS.BASE}${
    URLS.ARTICLES_ENDPOINT
  }?page=${pageNumber}&per_page=${perPage}${
    authorId ? `&author=${authorId}` : `&${URLS.previewFields}${TAG}${SEARCH}`
  }`;

  try {
    return await fetch(url)
      .then((res) =>
        res.json().then((json) => ({
          headers: res.headers,
          json,
        }))
      )
      .then(({ headers, json }) => ({
        articles: json,
        pageNumber: pageNumber,
        totalArticlesCount: headers.get("x-wp-total"),
      }));
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}
