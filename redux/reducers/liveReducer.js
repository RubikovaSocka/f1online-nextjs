import { TYPES } from "../actions/liveActions";

const defaultState = {
  news: [],
  oldestItemTime: null,
  latestItemTime: null,
  start: null,
  end: null,
  isLoading: true,
  error: null,
  hasMore: true,
  hasEnded: false,
};

const liveReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INITIALIZE:
      return {
        ...defaultState,
        start: action.start,
        end: action.end,
        oldestItemTime: action.end,
        latestItemTime: action.start,
        error: null,
        hasEnded:
          action.start &&
          action.end &&
          action.start.length > 0 &&
          action.end.length > 0,
      };
    case TYPES.AUTO_SUCCESS:
      const newArray = [...action.news, ...state.news];
      return {
        ...state,
        news: newArray,
        latestItemTime: newArray[0] ? newArray[0].date : null,
        oldestItemTime: newArray[newArray.length - 1]
          ? newArray[newArray.length - 1].date
          : null,
        hasEnded: newArray[0].acf.hasEnded === "Áno" || state.hasEnded,
        error: null,
      };
    case TYPES.AUTO_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case TYPES.FETCH_ARCHIVE:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.FETCH_ARCHIVE_SUCCESS:
      const newArray2 = [...state.news, ...action.news];
      return {
        ...state,
        news: newArray2,
        isLoading: false,
        error: null,
        latestItemTime: newArray2[0] ? newArray2[0].date : null,
        oldestItemTime: newArray2[newArray2.length - 1]
          ? newArray2[newArray2.length - 1].date
          : null,
        hasEnded: newArray2[0].acf.hasEnded === "Áno" || state.hasEnded,
        hasMore: parseInt(action.totalNewsCount) !== 0,
      };
    case TYPES.FETCH_ARCHIVE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};

export default liveReducer;
