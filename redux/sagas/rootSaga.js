import { takeLatest } from "redux-saga/effects";
import { PANELS } from "../constants";
import handleFetchPanels from "./handlers/handleFetchPanels";

//watcher
function* rootSaga() {
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
