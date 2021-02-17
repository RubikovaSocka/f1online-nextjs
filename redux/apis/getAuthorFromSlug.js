import { URLS } from "./urls";

export default async function getAuthorFromSlug(authorSlug) {
  let picked;
  try {
    const authors = await fetch(URLS.AUTHORS_DATA_ENDPOINT)
      .then((res) => res.json())
      .then((res) => res);
    picked = authors.filter((author) => author.fslug === authorSlug);
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
  if (picked.length === 1) return picked[0];
  throw new Error("Autora sa nepodarilo nájsť.");
}
