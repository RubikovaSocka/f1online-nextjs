import { THEME } from "../actions/types";

const defaultState = {
  isThemeLight: true
};

const themeReducer = (state = defaultState, action) => {
  return action.type === THEME.CHANGE
    ? {
        isThemeLight: !state.isThemeLight
      }
    : state;
};

export default themeReducer;
