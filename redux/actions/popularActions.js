const TYPES = {
  FETCH: "FETCH_POPULAR_ARTICLES",
  SUCCESS: "FETCH_POPULAR_ARTICLES_SUCCESS",
  FAIL: "FETCH_POPULAR_ARTICLES_FAIL",
};

const TIMEFRAMES = {
  TODAY: "POPULAR_TIMEFRAMES_TODAY",
  DAYS: "POPULAR_TIMEFRAMES_DAYS",
  WEEK: "POPULAR_TIMEFRAMES_WEEK",
};

const fetchPopularArticles = (timeframe) => ({
  type: TYPES.FETCH,
  timeframe,
});

const setPopularArticles = ({ articles, timeframe }) => ({
  type: TYPES.SUCCESS,
  articles,
  timeframe,
});

const setPopularError = ({ error, timeframe }) => ({
  type: TYPES.FAIL,
  error,
  timeframe,
});

export {
  TYPES,
  TIMEFRAMES,
  fetchPopularArticles,
  setPopularArticles,
  setPopularError,
};
