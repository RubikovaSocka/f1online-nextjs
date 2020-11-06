import { TYPES } from "../actions/f1ResultsActions";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  results: [],
  error: null,
  isLoading: true
};

const f1ResultsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE: {
      //hydrate only if server sends all results (results page visited)
      if (state.results.length < action.payload.f1Results.results.length) {
        return {
          ...action.payload.f1Results
        };
      }
    }
    case TYPES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        results: action.results
      };
    }
    case TYPES.ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default f1ResultsReducer;
