import fetchPanelsApi from "../../../apis/fetchPanelsApi";

function* handleFetchPanels() {
  const panelsData = yield call(fetchFavouritesFun, ids);
  yield put(setPanels(panelsData));
}

export default handleFetchPanels;
