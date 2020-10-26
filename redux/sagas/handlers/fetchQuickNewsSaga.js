import { call, put, select } from "redux-saga/effects";
import fetchQuickNews from "../../apis/fetchQuickNewsApi";
import { setArchiveArticles, setArchiveArticlesError } from "../../actions/quickNewsActions";

const getPage = state => state.quickNews.pageNumber;

function* fetchQuickNewsSaga() {
  try {
    const page = yield select(getPage);
    const quickNews = yield call(fetchQuickNews, page);
    yield put(setArchiveArticles(quickNews));
  } catch (err) {
    yield put(setArchiveArticlesError(err.toString()));
  }
}

export default fetchQuickNewsSaga;
