import {}

//watcher
function* rootSaga() {
  yield takeLatest()
  /*yield takeEvery(MOVIES.SEARCH_FETCH_NEW, handleSearchFetch);
  yield takeEvery(MOVIES.SEARCH_FETCH_MORE, handleSearchFetch);

  yield takeEvery(MOVIES.DETAIL_FETCH, handleMovDetailFetch);

  yield takeEvery(MOVIES.FAVOURITES_ADD, handleFavAdd);
  yield takeEvery(MOVIES.FAVOURITES_DELETE, handleFavDelete);
  yield takeLatest(MOVIES.FAVOURITES_LOAD_STORAGE, handleFavsLoad);
  yield takeLatest(MOVIES.FAVOURITES_FETCH, handleFavsFetch);*/
}

export default rootSaga;