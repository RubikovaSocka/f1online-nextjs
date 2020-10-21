import { ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  stickyArticles: [],
  nonStickyArticles: [],
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
        nonStickyArticles: action.articles
      };

    default:
      return state;
  }
};

export default articlesReducer;
