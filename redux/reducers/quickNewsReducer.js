import { QUICK_NEWS } from "../constants";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  news: [],
  isLoaded: false,
  error: null
};

const quickNewsReducer = (state = defaultState, action) => {
  console.log(action)
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.quickNews };

    case QUICK_NEWS.FETCH:
      return {
        ...state,
        isLoaded: false,
        error: null
      };
    case QUICK_NEWS.FETCH_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        error: null,
        news: action.news
      };

    default:
      return state;
  }
};

export default quickNewsReducer;
