import { call, put, select } from "redux-saga/effects";
import fetchQuickNews from "../../../apis/fetchQuickNewsApi";
import { setQuickNews, setQuickNewsError } from "../../actions/quickNewsActions";

const getPage = state => state.quickNews.pageNumber;

function* fetchQuickNewsSaga() {
  try {
    const page = yield select(getPage);
    const quickNews = yield call(fetchQuickNews, page);
    yield put(setQuickNews(quickNews));
  } catch (err) {
    yield put(setQuickNewsError(err));
  }
}

export default fetchQuickNewsSaga;
