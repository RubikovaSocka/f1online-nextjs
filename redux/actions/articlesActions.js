import { INDEX_ARTICLES } from "../constants";

const fetchNewArticles = () => { console.log("OK"); return ({
  type: INDEX_ARTICLES.FETCH
})};

const fetchMoreArticles = () => ({
  type: INDEX_ARTICLES.FETCH_MORE
});

const setArticles = articles => ({
  type: INDEX_ARTICLES.FETCH_SUCCESS,
  articles
});

const setArticlesError = error => ({
  type: INDEX_ARTICLES.FETCH_FAIL,
  error
});

export { fetchNewArticles, fetchMoreArticles, setArticles, setArticlesError };
