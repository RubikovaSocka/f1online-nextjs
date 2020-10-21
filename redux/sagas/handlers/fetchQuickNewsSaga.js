import { call, put } from "redux-saga/effects";
import fetchQuickNews from "../../../apis/fetchQuickNewsApi";
import { setQuickNews, setQuickNewsError } from "../../actions/articlesActions";

function* fetchQuickNewsSaga() {
  try {
    const quickNews = yield call(fetchArticles);
    yield put(setQuickNews(quickNews));
  } catch (err) {
    yield put(setQuickNewsError(err));
  }
}

export default fetchQuickNewsSaga;
