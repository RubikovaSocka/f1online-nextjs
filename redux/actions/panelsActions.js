import { PANELS } from "../constants";

const fetchPanels = () => ({
  type: PANELS.FETCH
});

const setPanels = json => ({
  type: PANELS.FETCH_SUCCESS,
  json
});

const setPanelsError = error => ({
  type: PANELS.FETCH_FAIL,
  error
});

export {
  fetchPanels,
  setPanels,
  setPanelsError
};
