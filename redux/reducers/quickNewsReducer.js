import { QUICK_NEWS } from "../constants";

const defaultState = {
  news: [],
  isLoading: false,
  error: null
};

const quickNewsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.quickNews };

    case INDEX_ARTICLES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case INDEX_ARTICLES.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        news: action.news
      };

    default:
      return state;
  }
};

export default quickNewsReducer;
