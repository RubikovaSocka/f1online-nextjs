import { TYPES } from "../actions/authorArchiveActions";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  articles: [],
  error: null,
  pageNumber: 1,
  isLoading: true,
  totalArticlesCount: 0,
  author: null,
};

const authorArticlesReducer = (state = defaultState, action) => {
  console.log(action.type);
  switch (action.type) {
    case HYDRATE:
      console.log("hydrating", action);
      //if (action.payload.authorArticles.articles.length > 0) {
        return {
          ...state,
          ...action.payload.authorArticles,
        };
      //}

    case TYPES.FETCH:
      return {
        ...state,
        error: null,
        isLoading: true,
        pageNumber: action.pageNumber,
      };
    case TYPES.SUCCESS: {
      return {
        ...state,
        error: null,
        articles: action.articles,
        totalArticlesCount: action.totalArticlesCount,
        author: action.authorData,
        isLoading: false,
      };
    }
    case TYPES.ERROR: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        articles: [],
      };
    }
  }
  return state;
};

export default authorArticlesReducer;
