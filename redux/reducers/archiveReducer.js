import { ARCHIVE_ARTICLES } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  server: {
    articles: [],
    error: null,
    pageNumber: 1,
    isLoading: true,
    totalArticlesCount: 0
  },
  client: {
    articles: [],
    isLoading: true,
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
          error: null,
          isLoading: true
        }
      };
    case ARCHIVE_ARTICLES.FETCH_SUCCESS_SERVER: {
      return {
        ...state,
        client: {
          isLoading: false
        },
        server: {
          error: null,
          articles: action.articles,
          totalArticlesCount: action.totalArticlesCount,
          isLoading: false
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
