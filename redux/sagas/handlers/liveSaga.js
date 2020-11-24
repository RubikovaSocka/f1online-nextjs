import {
  take,
  put,
  call,
  fork,
  cancel,
  delay,
  takeLatest,
  select,
} from "redux-saga/effects";
import {
  TYPES,
  addLiveNews,
  addLiveNewsArchive,
  setLiveNewsArchiveError,
} from "../../actions/liveActions";
import { DELAY } from "../../timerValues";
import fetchLiveNews from "../../apis/fetchLiveNews";

const getEndTime = (state) => state.live.end;
const getLatestTime = (state) => state.live.latestItemTime;
const getOldestTime = (state) => state.live.oldestItemTime;
const getStartTime = (state) => state.live.start;
const initialLoad = (state) => state.live.news.length === 0;

function* loadOlder() {
  try {
    const oldest = yield select(getOldestTime);
    const start = yield select(getStartTime);
    const quickNews = yield call(fetchLiveNews, {
      before: oldest,
      start: start,
    });
    yield put(addLiveNewsArchive(quickNews));
  } catch (err) {
    yield put(setLiveNewsArchiveError(err.toString()));
  }
}

function* bgLoader() {
  try {
    while (true) {
      const latest = yield select(getLatestTime);
      const end = yield select(getEndTime);
      const result = yield call(fetchLiveNews, {
        after: latest,
        end: end,
        initialLoad: initialLoad,
      });
      yield put(addLiveNews(result));
      yield delay(DELAY.LIVE_NEWS_DELAY);
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("FINALLY");
  }
}

function* main() {
  yield takeLatest(TYPES.FETCH_ARCHIVE, loadOlder);

  while (yield take(TYPES.START_AUTOFETCH)) {
    const bgSyncTask = yield fork(bgLoader);

    // wait for the user stop action
    yield take(TYPES.PAUSE_AUTOFETCH);
    // user clicked stop. cancel the background task
    yield cancel(bgSyncTask);
  }
}

export default main;
