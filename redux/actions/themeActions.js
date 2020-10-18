import { CHANGE_THEME } from "./types.js";



export const changeTheme = (data) => (dispatch, state) => {
  console.log("action: ")
  console.log(data)
  if (data.themeName) {
    dispatch({
      type: CHANGE_THEME,
      payload: data.themeName
    });
  }
};
