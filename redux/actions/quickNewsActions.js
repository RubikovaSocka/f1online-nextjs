import { QUICK_NEWS } from "../constants";

const fetchNewQuickNews = () => ({
  type: QUICK_NEWS.FETCH
});

const fetchMoreQuickNews = () => ({
  type: QUICK_NEWS.FETCH_MORE
});

const setQuickNews = articles => ({
  type: QUICK_NEWS.FETCH_SUCCESS,
  articles
});

const setQuickNewsError = error => ({
  type: QUICK_NEWS.FETCH_FAIL,
  error
});

export {
  fetchNewQuickNews,
  fetchMoreQuickNews,
  setQuickNews,
  setQuickNewsError
};
