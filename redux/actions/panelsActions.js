import axios from "axios";
import { FETCH_PANELS } from "./types.js";

export const fetchPanels = () => (dispatch, state) => {
  if (state.loaded) {
    dispatch({
      type: FETCH_PANELS,
      payload: state.panelsJSON
    })
  } else {
    axios
      .get("https://wpadmin.f1online.sk/wp-content/uploads/parts.json")
      .then(panels =>
        dispatch({
          type: FETCH_PANELS,
          payload: panels.data
        })
      );
  }
};
