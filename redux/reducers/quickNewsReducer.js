import { QUICK_NEWS } from "../constants";
import { HYDRATE } from "next-redux-wrapper";


const defaultState = {
  news: [],
  isLoading: false,
  error: null
};

const quickNewsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.quickNews };

    case QUICK_NEWS.FETCH:
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
        news: action.news
      };

    default:
      return state;
  }
};

export default quickNewsReducer;
