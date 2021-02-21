import { PANELS } from "../constants";

const defaultState = {
  json: {},
  probabilites: {},
  error: null,
  isLoading: true,
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
      };
    case PANELS.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};

export default panelReducer;
