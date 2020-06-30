import { CHANGE_THEME } from "../actions/types";

const initialState = {
  isThemeLight: true,
  lightTheme: { logoSrc: "/images/logo-light.png" },
  darkTheme: { logoSrc: "/images/logo-dark.png" }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        isThemeLight:
          action.payload === "light"
            ? true
            : action.payload === "dark"
            ? false
            : true
      };
    default:
      return state;
  }
}
