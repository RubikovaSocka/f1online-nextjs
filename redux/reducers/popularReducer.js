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
        today:
          action.timeframe === TIMEFRAMES.TODAY ? action.articles : state.today,
        days:
          action.timeframe === TIMEFRAMES.DAYS ? action.articles : state.days,
        week:
          action.timeframe === TIMEFRAMES.WEEK ? action.articles : state.week,
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
