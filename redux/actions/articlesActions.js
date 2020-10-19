import { ARTICLES } from "../constants";

const fetchNewArticles = () => ({
  type: ARTICLES.FETCH
});

const fetchMoreArticles = () => ({
  type: ARTICLES.FETCH_MORE
});

const setArticles = articles => ({
  type: ARTICLES.FETCH_SUCCESS
});

const setArticlesError = error => ({
  type: ARTICLES.FETCH_FAIL
});

export { fetchNewArticles, fetchMoreArticles, setArticles, setArticlesError };
