import { fork, takeLatest, take, takeEvery } from "redux-saga/effects";
import { PANELS, INDEX_ARTICLES, QUICK_NEWS, ARCHIVE_ARTICLES } from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";
import fetchArticlesSaga from "./handlers/fetchArticlesSaga";
import fetchQuickNewsSaga from "./handlers/fetchQuickNewsSaga";
import fetchArchiveArticlesSaga from "./handlers/fetchArchiveArticlesSaga";
import fetchF1ResultsSaga from "./handlers/fetchF1ResultsSaga";
import { TYPES as F1_RESULTS } from '../actions/f1ResultsActions'

//watcher
function* rootSaga() {
  yield takeLatest(INDEX_ARTICLES.FETCH, fetchArticlesSaga);

  yield takeLatest(QUICK_NEWS.FETCH, fetchQuickNewsSaga);
  yield takeLatest(QUICK_NEWS.FETCH_MORE, fetchQuickNewsSaga);
  
  yield takeLatest(ARCHIVE_ARTICLES.FETCH, fetchArchiveArticlesSaga),
  yield takeLatest(F1_RESULTS.FETCH, fetchF1ResultsSaga);
  //yield takeLatest(ARCHIVE_ARTICLES.FETCH_SERVER, fetchArchiveArticlesSaga)
  //yield takeLatest(ARTICLES.FETCH, handleFetchArticles);
  //yield takeLatest(PANELS.FETCH, handleFetchPanels);
}

export default rootSaga;
