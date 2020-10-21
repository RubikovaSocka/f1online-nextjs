import { ARTICLES } from "../constants";

const fetchNewArticles = () => { console.log("OK"); return ({
  type: ARTICLES.FETCH
})};

const fetchMoreArticles = () => ({
  type: ARTICLES.FETCH_MORE
});

const setArticles = articles => ({
  type: ARTICLES.FETCH_SUCCESS,
  articles
});

const setArticlesError = error => ({
  type: ARTICLES.FETCH_FAIL,
  error
});

export { fetchNewArticles, fetchMoreArticles, setArticles, setArticlesError };
