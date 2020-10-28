const TYPES = {
  FETCH: "TAG_ARCHIVES_ARTICLES_FETCH",
  FETCH_SUCCESS_CLIENT: "TAG_ARCHIVE_ARTICLES_FETCH_SUCCESS",
  FETCH_SUCCESS_SERVER: "TAG_ARCHIVE_ARTICLES_FETCH_SUCCESS_SERVER",
  FETCH_FAIL: "TAG_ARCHIVE_ARTICLES_FETCH_FAIL"
}

const fetchTagArchiveArticles = ({ pageNumber, perPage, tagSlug, isServer }) => ({
  type: TYPES.FETCH,
  isServer,
  pageNumber,
  tagSlug,
  perPage
});

const fetchMoreTagArchiveArticles = () => ({
  type: TYPES.FETCH_MORE
});

const setTagArchiveArticles = payload => ({
  type: TYPES.FETCH_SUCCESS_CLIENT,
  articles: payload.articles,
  totalArticlesCount: payload.totalArticlesCount,
  pageNumber: payload.pageNumber,
});

const setTagArchiveArticlesServer = payload => ({
  type: TYPES.FETCH_SUCCESS_SERVER,
  articles: payload.articles,
  totalArticlesCount: payload.totalArticlesCount
});

const setTagArchiveArticlesError = error => ({
  type: TYPES.FETCH_FAIL,
  error
});

export {
  TYPES,
  fetchTagArchiveArticles,
  fetchMoreTagArchiveArticles,
  setTagArchiveArticles,
  setTagArchiveArticlesServer,
  setTagArchiveArticlesError
};
