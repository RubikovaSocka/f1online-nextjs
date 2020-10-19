import { call, put } from "redux-saga/effects";
import fetchArticles from "../../../apis/fetchArticlesApi";
import { setArticles } from "../../actions/panelsActions";

function* handleFetchArticles() {
  const articles = yield call(fetchArticles);
  yield put(setArticles(articles));
}

export default handleFetchArticles;
