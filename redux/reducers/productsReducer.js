import { TYPES } from "../actions/productsActions";

const defaultState = {
  products: [],
  error: null,
  isLoading: true,
};

const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TYPES.FETCH_SUCCESS:
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };
    case TYPES.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};

export default productsReducer;
