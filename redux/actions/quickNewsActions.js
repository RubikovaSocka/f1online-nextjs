const TYPES = {
  START: "QUICK_NEWS_START",
  AUTOFETCH_SUCCESS: "QUICK_NEWS_AUTOFETCH_SUCCESS",
  AUTOFETCH_FAIL: "QUICK_NEWS_AUTOFETCH_FAIL",

  FETCH_ARCHIVE: "QUICK_NEWS_FETCH_ARCHIVE",
  FETCH_ARCHIVE_SUCCESS: "QUICK_NEWS_FETCH_ARCHIVE_SUCC",
  FETCH_ARCHIVE_FAIL: "QUICK_NEWS_FETCH_ARCHIVE_FAIL"
};

// actions for fetching new quicknews
const startQuickNewsAutoFetch = () => ({
  type: TYPES.START
});

const addNewQuickNews = payload => ({
  type: TYPES.AUTOFETCH_SUCCESS,
  news: payload.news,
  totalNewsCount: payload.totalNewsCount
});

const setNewQuickNewsError = error => ({
  type: TYPES.AUTOFETCH_FAIL,
  error
});

// actions for fetching older items on scroll
const fetchQuickNewsArchive = () => ({
  type: TYPES.FETCH_ARCHIVE
});

const addQuickNewsArchive = payload => ({
  type: TYPES.FETCH_ARCHIVE_SUCCESS,
  news: payload.news,
  totalNewsCount: payload.totalNewsCount
});

const setQuickNewsArchiveError = error => ({
  type: TYPES.FETCH_ARCHIVE_FAIL,
  error
});

export {
  TYPES,
  startQuickNewsAutoFetch,
  addNewQuickNews,
  setNewQuickNewsError,
  fetchQuickNewsArchive,
  addQuickNewsArchive,
  setQuickNewsArchiveError
};
