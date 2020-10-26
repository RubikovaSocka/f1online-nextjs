import { QUICK_NEWS } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  news: [],
  isLoading: false,
  error: null,
  totalNewsCount: 0,
  pageNumber: 1
};

const quickNewsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE: {
      if (action.payload.quickNews.news.length !== 0) {
        return {
          ...state,
          ...action.payload.quickNews
        };
      }
    }

    case QUICK_NEWS.FETCH:
    case QUICK_NEWS.FETCH_MORE:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case QUICK_NEWS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        news: [...state.news, ...action.news],
        totalNewsCount: action.totalNewsCount,
        pageNumber: state.pageNumber + 1
      };
    case QUICK_NEWS.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default quickNewsReducer;
