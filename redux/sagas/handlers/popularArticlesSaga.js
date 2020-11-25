import { call, put } from "redux-saga/effects";
import fetchPopularArticles from "../../apis/fetchPopularArticlesApi";
import {
  setPopularArticles,
  setPopularError,
} from "../../actions/popularActions";

function* popularArticlesSaga() {
  try {
    const articles = yield call(fetchPopularArticles);
    yield put(setPopularArticles(articles));
  } catch (err) {
    yield put(setPopularError(err));
  }
}

export default popularArticlesSaga;
