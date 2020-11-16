import { call, put, select, takeLatest, delay } from "redux-saga/effects";
import fetchQuickNews from "../../apis/fetchQuickNewsApi";
import {
  addNewQuickNews,
  setNewQuickNewsError,
  addQuickNewsArchive,
  setQuickNewsArchiveError
} from "../../actions/quickNewsActions";

import { TYPES } from "../../actions/quickNewsActions";
import { DELAY } from "../../timerValues";

const getLatestTime = state => state.quickNews.latestItemTime;
const getOldestTime = state => state.quickNews.oldestItemTime;

function* fetchOlderQuickNewsSaga() {
  try {
    const oldest = yield select(getOldestTime);
    const quickNews = yield call(fetchQuickNews, {
      before: oldest
    });
    yield put(addQuickNewsArchive(quickNews));
  } catch (err) {
    yield put(setQuickNewsArchiveError(err.toString()));
  }
}

function* quickNewsAutofetchSaga() {
  yield takeLatest(TYPES.FETCH_ARCHIVE, fetchOlderQuickNewsSaga);
  while (true) {
    try {
      const latest = yield select(getLatestTime);
      const itemsBatch = yield call(fetchQuickNews, {
        after: latest
      });
      yield put(addNewQuickNews(itemsBatch));
    } catch (err) {
      yield put(setNewQuickNewsError(err.toString()));
    }
    yield delay(DELAY.QUICK_NEWS_DELAY);
  }
}

export default quickNewsAutofetchSaga;
