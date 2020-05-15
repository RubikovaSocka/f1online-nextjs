import { FETCH_PANELS } from "../actions/types";

const initialState = {
  panelsJSON: {},
  loaded: false
};

export default function(state = initialState, action) {
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
