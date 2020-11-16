import { TYPES } from "../actions/quickNewsActions";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  news: [],
  isLoading: true,
  error: null,
  totalNewsCount: 0,
  latestItemTime: null,
  oldestItemTime: null
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
      break;
    }
    case TYPES.AUTOFETCH_SUCCESS:
      if (action.news.length > 0) {
        const newArray = [...action.news, ...state.news];
        return {
          news: newArray,
          isLoading: false,
          error: null,
          totalNewsCount: action.totalNewsCount,
          latestItemTime: newArray.length > 0 ? newArray[0].date : null,
          oldestItemTime:
            newArray.length > 0 ? newArray[newArray.length - 1].date : null
        };
      }

    case TYPES.AUTOFETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case TYPES.FETCH_ARCHIVE:
      return {
        ...state,
        archiveLoading: true,
        error: null
      };
    case TYPES.FETCH_ARCHIVE_SUCCESS:
      const newsArray = [...state.news, ...action.news];
      return {
        news: newsArray,
        isLoading: false,
        error: null,
        totalNewsCount: action.totalNewsCount,
        latestItemTime: newsArray.length > 0 ? newsArray[0].date : null,
        oldestItemTime:
          newsArray.length > 0 ? newsArray[newsArray.length - 1].date : null
      };

    case TYPES.FETCH_ARCHIVE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
  }
  return state;
};

export default quickNewsReducer;
