import { FETCH_PANELS } from "../actions/types";

const initialState = {
  panelsJSON: {},
  loaded: false
};

const panelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PANELS:
      return {
        ...state,
        loaded: true,
        data: action.payload
      };
    default:
      return state;
  }
}

export default panelReducer;