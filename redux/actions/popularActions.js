const TYPES = {
  FETCH: "FETCH_POPULAR_ARTICLES",
  SUCCESS: "FETCH_POPULAR_ARTICLES_SUCCESS",
  FAIL: "FETCH_POPULAR_ARTICLES_FAIL",
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

export { TYPES, fetchPopularArticles, setPopularArticles, setPopularError };
