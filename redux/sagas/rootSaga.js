import { fork, takeLatest, take, takeEvery } from "redux-saga/effects";
import { PANELS, INDEX_ARTICLES } from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";
import fetchArticlesSaga from "./handlers/fetchArticlesSaga";

//watcher
function* rootSaga() {
  yield takeLatest(INDEX_ARTICLES.FETCH, fetchArticlesSaga);
  //yield takeLatest(ARTICLES.FETCH, handleFetchArticles);
  //yield takeLatest(PANELS.FETCH, handleFetchPanels);
}

export default rootSaga;
