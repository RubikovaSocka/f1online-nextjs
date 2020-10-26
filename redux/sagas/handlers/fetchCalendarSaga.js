import { call, put } from "redux-saga/effects";
import fetchCalendar from "../../apis/fetchCalendar";
import { setCalendar, setCalendarError } from "../../actions/calendarActions";

function* fetchCalendarSaga({ perPage }) {
  try {
    const data = yield call(fetchCalendar, perPage);
    yield put(setCalendar(data));
  } catch (err) {
    yield put(setCalendarError(err.toString()));
  }
}

export default fetchCalendarSaga;
