import { ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  indexArticles: [],
  isLoading: false,
  error: null
};

const articlesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.articles };

    case ARTICLES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ARTICLES.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexArticles: action.articles
      };

    default:
      return state;
  }
};

export default articlesReducer;
