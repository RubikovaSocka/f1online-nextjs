import { ARCHIVE_ARTICLES } from "../constants";

const fetchArchiveArticles = ({ pageNumber, perPage, searchPhrase, isServer }) => ({
  type: ARCHIVE_ARTICLES.FETCH,
  isServer,
  pageNumber,
  perPage,
  searchPhrase
});

const fetchMoreArchiveArticles = () => ({
  type: ARCHIVE_ARTICLES.FETCH_MORE
});

const setArchiveArticles = payload => ({
  type: ARCHIVE_ARTICLES.FETCH_SUCCESS_CLIENT,
  articles: payload.articles,
  totalArticlesCount: payload.totalArticlesCount,
  pageNumber: payload.pageNumber,
});

const setArchiveArticlesServer = payload => ({
  type: ARCHIVE_ARTICLES.FETCH_SUCCESS_SERVER,
  articles: payload.articles,
  totalArticlesCount: payload.totalArticlesCount
});

const setArchiveArticlesError = error => ({
  type: ARCHIVE_ARTICLES.FETCH_FAIL,
  error
});

export {
  fetchArchiveArticles,
  fetchMoreArchiveArticles,
  setArchiveArticles,
  setArchiveArticlesServer,
  setArchiveArticlesError
};
