import { QUICK_NEWS } from "../constants";

const fetchNewQuickNews = () => ({
  type: QUICK_NEWS.FETCH
});

const fetchMoreQuickNews = () => ({
  type: QUICK_NEWS.FETCH_MORE
});

const setQuickNews = payload => ({
  type: QUICK_NEWS.FETCH_SUCCESS,
  news: payload.news,
  totalNewsCount: payload.totalNewsCount
});

const setQuickNewsError = payload => ({
  type: QUICK_NEWS.FETCH_FAIL,
  payload
});

export {
  fetchNewQuickNews,
  fetchMoreQuickNews,
  setQuickNews,
  setQuickNewsError
};
