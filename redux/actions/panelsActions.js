import { PANELS } from "../constants";

const fetchPanelsAction = () => ({
  type: PANELS.FETCH
});

const fetchPanelsSuccessAction = json => ({
  type: PANELS.FETCH,
  json
});

const fetchPanelsFailAction = error => ({
  type: PANELS.FETCH,
  error
});

export default {
  fetchPanelsAction,
  fetchPanelsSuccessAction,
  fetchPanelsFailAction
};
