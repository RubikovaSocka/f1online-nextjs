import { takeLatest } from "redux-saga/effects";
import { PANELS, ARTICLES } from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";
import handleFetchArticles from "./handlers/handleFetchArticles";

//watcher
function* rootSaga() {
  yield takeLatest(ARTICLES.FETCH, handleFetchArticles);
  yield takeLatest(PANELS.FETCH, handleFetchPanels);
  /*yield takeEvery(MOVIES.SEARCH_FETCH_NEW, handleSearchFetch);
  yield takeEvery(MOVIES.SEARCH_FETCH_MORE, handleSearchFetch);

  yield takeEvery(MOVIES.DETAIL_FETCH, handleMovDetailFetch);

  yield takeEvery(MOVIES.FAVOURITES_ADD, handleFavAdd);
  yield takeEvery(MOVIES.FAVOURITES_DELETE, handleFavDelete);
  yield takeLatest(MOVIES.FAVOURITES_LOAD_STORAGE, handleFavsLoad);
  yield takeLatest(MOVIES.FAVOURITES_FETCH, handleFavsFetch);*/
}

export default rootSaga;
