import { INDEX_ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  indexArticles: [],
  isLoading: true,
  error: null
};

const articlesReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        indexArticles:
          action.payload.articles.indexArticles.length > 0
            ? action.payload.articles.indexArticles
            : state.indexArticles,
        isLoading: action.payload.articles.indexArticles.length === 0
      };

    case INDEX_ARTICLES.FETCH:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case INDEX_ARTICLES.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexArticles: action.articles
      };
    case INDEX_ARTICLES.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        indexArticles: []
      };
    default:
      return state;
  }
};

export default articlesReducer;
