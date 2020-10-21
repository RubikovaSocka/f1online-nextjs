import { call, put } from "redux-saga/effects";
import fetchQuickNews from "../../../apis/fetchQuickNewsApi";
import { setQuickNews, setQuickNewsError } from "../../actions/quickNewsActions";

function* fetchQuickNewsSaga() {
  try {
    const quickNews = yield call(fetchQuickNews);
    yield put(setQuickNews(quickNews));
  } catch (err) {
    yield put(setQuickNewsError(err));
  }
}

export default fetchQuickNewsSaga;
