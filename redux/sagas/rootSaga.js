import { fork, takeLatest, take, takeEvery } from "redux-saga/effects";
import {
  PANELS,
  INDEX_ARTICLES,
  QUICK_NEWS,
  ARCHIVE_ARTICLES
} from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";
import fetchArticlesSaga from "./handlers/fetchArticlesSaga";
import fetchQuickNewsSaga from "./handlers/fetchQuickNewsSaga";
import fetchArchiveArticlesSaga from "./handlers/fetchArchiveArticlesSaga";
import fetchF1ResultsSaga from "./handlers/fetchF1ResultsSaga";
import fetchProgrammeSaga from "./handlers/fetchProgrammeSaga";
import fetchCalendarSaga from "./handlers/fetchCalendarSaga";
import initializeThemeSaga from "./handlers/initializeThemeSaga";
import saveThemeSaga from "./handlers/saveThemeSaga";

import { TYPES as F1_RESULTS } from "../actions/f1ResultsActions";
import { TYPES as CALENDAR } from "../actions/calendarActions";
import { TYPES as PROGRAMME } from "../actions/programmeActions";
import { TYPES as THEME } from "../actions/themeActions";

//watcher
function* rootSaga() {
  yield takeLatest(INDEX_ARTICLES.FETCH, fetchArticlesSaga);

  yield takeLatest(QUICK_NEWS.FETCH, fetchQuickNewsSaga);
  yield takeLatest(QUICK_NEWS.FETCH_MORE, fetchQuickNewsSaga);

  yield takeLatest(ARCHIVE_ARTICLES.FETCH, fetchArchiveArticlesSaga);
  yield takeLatest(F1_RESULTS.FETCH, fetchF1ResultsSaga);
  yield takeLatest(CALENDAR.FETCH, fetchCalendarSaga);
  yield takeLatest(PROGRAMME.FETCH, fetchProgrammeSaga);

  yield takeLatest(THEME.INITIALIZE, initializeThemeSaga);
  yield takeLatest(THEME.SET, saveThemeSaga);

  //yield takeLatest(ARCHIVE_ARTICLES.FETCH_SERVER, fetchArchiveArticlesSaga)
  //yield takeLatest(ARTICLES.FETCH, handleFetchArticles);
  yield takeLatest(PANELS.FETCH, handleFetchPanels);
}

export default rootSaga;
