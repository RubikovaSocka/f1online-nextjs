import { PANELS } from "../constants";

const fetchPanels = () => ({
  type: PANELS.FETCH
});

const setPanels = json => ({
  type: PANELS.FETCH,
  json
});

const setPanelsError = error => ({
  type: PANELS.FETCH,
  error
});

export {
  fetchPanels,
  setPanels,
  setPanelsError
};
