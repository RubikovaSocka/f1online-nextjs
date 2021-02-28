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

const countImpression = (partnerName) => ({
  type: PANELS.COUNT_IMPRESSION,
  partnerName,
});

const resetImpressions = (currentTime) => ({
  type: PANELS.RESET_IMPRESSIONS,
  currentTime,
});

export {
  fetchPanels,
  setPanels,
  setPanelsError,
  countImpression,
  resetImpressions,
};
