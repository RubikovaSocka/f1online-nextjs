const TYPES = {
  FETCH: "F1_RESULTS_FETCH",
  SUCCESS: "F1_RESULTS_SUCCESS",
  ERROR: "F1_RESULTS_ERROR"
};

const fetchF1Results = ({ perPage }) => ({
  type: TYPES.FETCH,
  perPage
});

const setF1Results = results => ({
  type: TYPES.SUCCESS,
  results
});

const setF1ResultsError = error => ({
  type: TYPES.ERROR,
  error
});

export { TYPES, fetchF1Results, setF1Results, setF1ResultsError };
