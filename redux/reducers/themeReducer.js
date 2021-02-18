import { TYPES } from "../actions/themeActions";
import { THEMES } from "../../constants";

const defaultState = {
  theme: THEMES.LIGHT,
};

const themeReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case TYPES.SET:
      return {
        theme: action.theme,
      };
    case TYPES.CHANGE:
      return state;
  }
  return state;
};

export default themeReducer;
