import { call, put } from "redux-saga/effects";
import fetchArticlesApi from "../../../apis/fetchArticlesApi";
import { setArticles } from "../../actions/panelsActions";

function* handleFetchArticles() {
  const articles = yield call(fetchArticlesApi);
  yield put(setPanels(articles));
}

export default handleFetchArticles;
