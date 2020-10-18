import { call, put } from "redux-saga/effects";
import fetchPanelsApi from "../../../apis/fetchPanelsApi";
import { setPanels } from "../../actions/panelsActions";

function* handleFetchPanels() {
  const panelsData = yield call(fetchPanelsApi, ids);
  yield put(setPanels(panelsData));
}

export default handleFetchPanels;
