import { TYPES, TIMEFRAMES } from "../actions/popularActions";

const defaultState = {
  today: [],
  days: [],
  week: [],
  error: null,
  isLoading: true,
};

const popularReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.SUCCESS:
      return {
        ...state,
        isLoading: false,
        today: action.articles.today,
        days: action.articles.days,
        week: action.articles.week,
      };
    case TYPES.FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.type,
      };
  }
  return state;
};

export default popularReducer;
