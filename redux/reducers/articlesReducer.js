import { INDEX_ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  indexArticles: [],
  isLoading: false,
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
            : state.indexArticles
      };

    case INDEX_ARTICLES.FETCH:
      return {
        ...state,
        error: null
      };
    case INDEX_ARTICLES.FETCH_SUCCESS:
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
