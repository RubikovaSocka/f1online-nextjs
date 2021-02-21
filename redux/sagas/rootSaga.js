import { takeLatest } from "redux-saga/effects";
import { PANELS, INDEX_ARTICLES, ARCHIVE_ARTICLES } from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";
import fetchArticlesSaga from "./handlers/fetchArticlesSaga";
import quickNewsAutofetchSaga from "./handlers/quickNewsAutofetchSaga";
import fetchArchiveArticlesSaga from "./handlers/fetchArchiveArticlesSaga";
import fetchF1ResultsSaga from "./handlers/fetchF1ResultsSaga";
import fetchProgrammeSaga from "./handlers/fetchProgrammeSaga";
import fetchCalendarSaga from "./handlers/fetchCalendarSaga";
import initializeThemeSaga from "./handlers/initializeThemeSaga";
//import saveThemeSaga from "./handlers/saveThemeSaga";
import fetchCategoriesSaga from "./handlers/fetchCategoriesSaga";
import fetchTagArchiveArticlesSaga from "./handlers/fetchTagArchiveArticlesSaga";
import liveSaga from "./handlers/liveSaga";
import popularArticlesSaga from "./handlers/popularArticlesSaga";
import productsSaga from "./handlers/productsSaga";
import fetchAuthorArticlesSaga from "./handlers/fetchAuthorArticlesSaga";

import { TYPES as QUICK_NEWS } from "../actions/quickNewsActions";
import { TYPES as F1_RESULTS } from "../actions/f1ResultsActions";
import { TYPES as CALENDAR } from "../actions/calendarActions";
import { TYPES as PROGRAMME } from "../actions/programmeActions";
//import { TYPES as THEME } from "../actions/themeActions";
import { TYPES as TAG_ARCHIV } from "../actions/tagArchiveActions";
import { TYPES as CATEGORIES } from "../actions/categoriesActions";
import { TYPES as LIVE } from "../actions/liveActions";
import { TYPES as POPULAR } from "../actions/popularActions";
import { TYPES as PRODUCTS } from "../actions/productsActions";
import { TYPES as AUTHOR_ARCHIVE_ARTICLES } from "../actions/authorArchiveActions";

//watcher
function* rootSaga() {
  yield takeLatest(TAG_ARCHIV.FETCH, fetchTagArchiveArticlesSaga);
  yield takeLatest(INDEX_ARTICLES.FETCH, fetchArticlesSaga);

  yield takeLatest(QUICK_NEWS.START, quickNewsAutofetchSaga);

  yield takeLatest(ARCHIVE_ARTICLES.FETCH, fetchArchiveArticlesSaga);
  yield takeLatest(AUTHOR_ARCHIVE_ARTICLES.FETCH, fetchAuthorArticlesSaga);
  yield takeLatest(F1_RESULTS.FETCH, fetchF1ResultsSaga);
  yield takeLatest(CALENDAR.FETCH, fetchCalendarSaga);
  yield takeLatest(PROGRAMME.FETCH, fetchProgrammeSaga);
  yield takeLatest(CATEGORIES.FETCH, fetchCategoriesSaga);

  //yield takeLatest(THEME.INITIALIZE, initializeThemeSaga);
  //yield takeLatest(THEME.SET, saveThemeSaga);

  yield takeLatest(PANELS.FETCH, handleFetchPanels);
  yield takeLatest(PRODUCTS.FETCH, productsSaga);
  yield takeLatest(POPULAR.FETCH, popularArticlesSaga);
  yield takeLatest(LIVE.INITIALIZE, liveSaga);
}

export default rootSaga;
