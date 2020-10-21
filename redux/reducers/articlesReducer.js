import { INDEX_ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  indexArticles: [],
  isLoaded: false,
  error: null
};

const articlesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.articles };

    case INDEX_ARTICLES.FETCH:
      return {
        ...state,
        isLoaded: false,
        error: null
      };
    case INDEX_ARTICLES.FETCH_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        error: null,
        indexArticles: action.articles
      };

    default:
      return state;
  }
};

export default articlesReducer;
