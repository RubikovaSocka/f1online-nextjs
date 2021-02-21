import { PANELS } from "../constants";

const fetchPanels = () => ({
  type: PANELS.FETCH,
});

const setPanels = (data) => ({
  type: PANELS.FETCH_SUCCESS,
  json: data.panels,
  probabilites: data.probabilites,
});

const setPanelsError = (error) => ({
  type: PANELS.FETCH_FAIL,
  error,
});

export { fetchPanels, setPanels, setPanelsError };
