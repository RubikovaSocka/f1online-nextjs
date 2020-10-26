import { call, put } from "redux-saga/effects";
import fetchF1Results from "../../apis/fetchF1Results";
import {
  setF1Results,
  setF1ResultsError
} from "../../actions/f1ResultsActions";

function* fetchF1ResultsSaga({ perPage }) {
  try {
    const data = yield call(fetchF1Results, perPage);
    yield put(setF1Results(data));
  } catch (err) {
    yield put(setF1ResultsError(err));
  }
}

export default fetchF1ResultsSaga;
