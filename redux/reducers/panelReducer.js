import { PANELS } from "../constants";

const defaultState = {
  json: {},
  probabilites: {},
  impressionsCounter: {},
  lastReset: null,
  error: null,
  isLoading: true,
};

const updateCounter = ({ lastReset }) => {
  if (!lastReset || Date.now() > lastReset + 864e5) {
    return {
      impressionsCounter: {},
      lastReset: Date.now(),
    };
  }
  return {};
};

const panelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PANELS.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case PANELS.FETCH_SUCCESS:
      return {
        ...state,
        json: action.json,
        probabilites: action.probabilites,
        isLoading: false,
        ...updateCounter(state),
      };
    case PANELS.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case PANELS.COUNT_IMPRESSION:
      return {
        ...state,
        impressionsCounter: {
          ...state.impressionsCounter,
          [`${action.partnerName}`]: state.impressionsCounter[
            `${action.partnerName}`
          ]
            ? state.impressionsCounter[`${action.partnerName}`] + 1
            : 1,
        },
      };
  }
  return state;
};

export default panelReducer;
