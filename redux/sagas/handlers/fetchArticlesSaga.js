import { call, put } from "redux-saga/effects";
import fetchArticles from "../../apis/fetchArticlesApi";
import { setArticles, setArticlesError } from "../../actions/articlesActions";

function* fetchArticlesSaga() {
  try {
    const articles = yield call(fetchArticles);
    yield put(setArticles(articles));
  } catch (err) {
    yield put(setArticlesError(err));
  }
}

export default fetchArticlesSaga;
