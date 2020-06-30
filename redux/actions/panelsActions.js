import axios from "axios";
import { FETCH_PANELS } from "./types.js";

export const fetchPanels = () => (dispatch, state) => {
  if (state.loaded) {
    dispatch({
      ...state,
      type: FETCH_PANELS,
    });
  } else {
    axios
      .get("https://wpadmin.f1online.sk/wp-content/uploads/parts.json")
      .then(panels =>
        dispatch({
          ...state,
          type: FETCH_PANELS,
          payload: panels.data
        })
      );
  }
};
