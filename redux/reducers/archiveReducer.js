import { ARCHIVE_ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  server: {
    articles: [],
    error: null,
    pageNumber: 1,
    isLoading: false,
    totalArticlesCount: 0
  },
  client: {
    articles: [],
    isLoading: false,
    error: null,
    pageNumber: 1,
    totalArticlesCount: 0
  }
};

const archiveArticlesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        server: { ...state.server, ...action.payload.archiveArticles.server }
      };

    case ARCHIVE_ARTICLES.FETCH:
      return {
        ...state,
        client: {
          ...state.client,
          isLoading: true,
          error: null,
        }
      };
    case ARCHIVE_ARTICLES.FETCH_SUCCESS_SERVER: {
      return {
        ...state,
        server: {
          error: null,
          articles: action.articles,
          totalArticlesCount: action.totalArticlesCount
        }
      };
    }
    
    case ARCHIVE_ARTICLES.FETCH_SUCCESS_CLIENT: {
      return {
        ...state,
        client: {
          isLoading: false,
          error: null,
          articles: action.articles,
          pageNumber: action.pageNumber
        }
      };
    }

    default:
      return state;
  }
};

export default archiveArticlesReducer;
