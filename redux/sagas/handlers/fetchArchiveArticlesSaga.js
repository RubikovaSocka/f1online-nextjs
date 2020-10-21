import { call, put, select } from "redux-saga/effects";
import fetchArchiveArticles from "../../../apis/fetchArchiveArticlesApi";
import {
  setArchiveArticles,
  setArchiveArticlesServer,
  setArchiveArticlesError
} from "../../actions/archiveActions";

function* fetchArchiveArticlesSaga({ pageNumber, perPage, isServer }) {
  try {
    const data = yield call(fetchArchiveArticles, pageNumber, perPage);
    if(isServer) {
      yield put(setArchiveArticlesServer(data));
    } else {
      yield put(setArchiveArticles(data));
    }
    
  } catch (err) {
    yield put(setArchiveArticlesError(err));
  }
}

export default fetchArchiveArticlesSaga;