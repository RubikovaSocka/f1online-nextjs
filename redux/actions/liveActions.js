const TYPES = {
  INITALIZE: "LIVE_INITALIZE",
  START_AUTOFETCH: "LIVE_START_AUTOFETCH",
  PAUSE_AUTOFETCH: "LIVE_PAUSE_AUTOFETCH",

  FETCH: "LIVE_FETCH",
  SUCCESS: "LIVE_SUCCESS",
  FAIL: "LIVE_FAIL",
};

const initalize = () => ({
  type: TYPES.INITALIZE,
});

const startLiveAutofetch = () => ({
  type: TYPES.START_AUTOFETCH,
});

const pauseLiveAutofetch = () => ({
  type: TYPES.PAUSE_AUTOFETCH,
});

const fetchLiveNews = () => ({
  type: TYPES.FETCH,
});

const setLiveNews = (news) => ({
  type: TYPES.SUCCESS,
  news,
});

const setLiveNewsError = (error) => ({
  type: TYPES.FAIL,
  error,
});

export {
  TYPES,
  initalize,
  startLiveAutofetch,
  pauseLiveAutofetch,
  fetchLiveNews,
  setLiveNews,
  setLiveNewsError,
};
