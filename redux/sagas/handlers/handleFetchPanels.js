import fetchPanelsApi from "../../../apis/fetchPanelsApi";

function* handleFetchPanels() {
  const panelsData = yield call(fetchPanelsApi, ids);
  yield put(setPanels(panelsData));
}

export default handleFetchPanels;
