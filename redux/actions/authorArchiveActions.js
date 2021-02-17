const TYPES = {
  FETCH: "AUTHOR_ARTICLES_FETCH",
  SUCCESS: "AUTHOR_ARTICLES_SUCCESS",
  ERROR: "AUTHOR_ARTICLES_ERROR",
};

const fetchNewAuthorArticles = ({ authorSlug, pageNumber, perPage }) => ({
  type: TYPES.FETCH,
  authorSlug,
  pageNumber,
  perPage,
});

const setAuthorArticles = ({ articlesData, authorData }) => ({
  type: TYPES.SUCCESS,
  ...articlesData,
  authorData,
});

const setAuthorArticlesError = (error) => ({
  type: TYPES.ERROR,
  error,
});

export {
  fetchNewAuthorArticles,
  setAuthorArticles,
  setAuthorArticlesError,
  TYPES,
};
