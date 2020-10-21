import { fork, takeLatest, take, takeEvery } from "redux-saga/effects";
import { PANELS, INDEX_ARTICLES, QUICK_NEWS } from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";
import fetchArticlesSaga from "./handlers/fetchArticlesSaga";
import fetchQuickNewsSaga from "./handlers/fetchQuickNewsSaga";

//watcher
function* rootSaga() {
  yield takeLatest(INDEX_ARTICLES.FETCH, fetchArticlesSaga);
  yield takeLatest(QUICK_NEWS.FETCH, fetchQuickNewsSaga);
  //yield takeLatest(ARTICLES.FETCH, handleFetchArticles);
  //yield takeLatest(PANELS.FETCH, handleFetchPanels);
}

export default rootSaga;
