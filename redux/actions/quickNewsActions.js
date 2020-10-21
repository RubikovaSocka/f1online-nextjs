import { QUICK_NEWS } from "../constants";

const fetchNewQuickNews = () => ({
  type: QUICK_NEWS.FETCH
});

const fetchMoreQuickNews = () => ({
  type: QUICK_NEWS.FETCH_MORE
});

const setArchiveArticles = payload => ({
  type: QUICK_NEWS.FETCH_SUCCESS,
  news: payload.news,
  totalNewsCount: payload.totalNewsCount
});

const setArchiveArticlesError = payload => ({
  type: QUICK_NEWS.FETCH_FAIL,
  payload
});

export {
  fetchNewQuickNews,
  fetchMoreQuickNews,
  setArchiveArticles,
  setArchiveArticlesError
};
