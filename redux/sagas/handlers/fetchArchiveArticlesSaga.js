import { call, put, select } from "redux-saga/effects";
import fetchArchiveArticles from "../../apis/fetchArchiveArticlesApi";
import {
  setArchiveArticles,
  setArchiveArticlesServer,
  setArchiveArticlesError
} from "../../actions/archiveActions";

function* fetchArchiveArticlesSaga({ pageNumber, perPage, searchPhrase, isServer }) {
  try {
    const data = yield call(fetchArchiveArticles, {
      pageNumber: pageNumber,
      perPage: perPage,
      searchPhrase: searchPhrase
    });
    if (isServer) {
      yield put(setArchiveArticlesServer(data));
    } else {
      yield put(setArchiveArticles(data));
    }
  } catch (err) {
    yield put(setArchiveArticlesError(err.toString()));
  }
}

export default fetchArchiveArticlesSaga;
