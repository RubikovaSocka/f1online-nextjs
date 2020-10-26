import { call, put } from "redux-saga/effects";
import fetchPanels from "../../apis/fetchPanelsApi";
import { setPanels } from "../../actions/panelsActions";

function* handleFetchPanels() {
  const panelsData = yield call(fetchPanels);
  yield put(setPanels(panelsData));
}

export default handleFetchPanels;
