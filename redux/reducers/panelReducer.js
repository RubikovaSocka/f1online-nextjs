import { PANELS } from "../constants";

const defaultState = {
  json: {},
  error: null,
  isLoading: false
};

const panelReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case PANELS.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case PANELS.FETCH_SUCCESS:
      return {
        ...state,
        json: action.json,
        isLoading: false
      };
    case PANELS.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default panelReducer;
