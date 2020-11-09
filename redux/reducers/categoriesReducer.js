import { TYPES } from "../actions/categoriesActions";

const defaultState = {
  isLoading: true,
  json: null,
  error: null
};

const categoriesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.FETCH:
      return {
        isLoading: true,
        error: null,
        json: null
      };
    case TYPES.SUCCESS:
      return {
        isLoading: false,
        error: null,
        json: action.json
      };
    case TYPES.FAIL:
      return {
        isLoading: false,
        error: action.error,
        json: null
      };
  }
  return state;
};

export default categoriesReducer;
