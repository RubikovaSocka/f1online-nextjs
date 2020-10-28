import { call, put } from "redux-saga/effects";
import fetchArchiveArticles from "../../apis/fetchArchiveArticlesApi";
import {
  setTagArchiveArticles,
  setTagArchiveArticlesServer,
  setTagArchiveArticlesError
} from "../../actions/tagArchiveActions";
import getTagIdFromTagSlug from "../../apis/getTagIdFromTagSlug";

function* fetchTagArchiveArticlesSaga({
  pageNumber,
  perPage,
  tagSlug,
  isServer
}) {
 try {
    const tagID = yield call(getTagIdFromTagSlug, tagSlug);
    const data = yield call(fetchArchiveArticles, {
      pageNumber: pageNumber,
      perPage: perPage,
      tagID: tagID
    });
    if (isServer) {
      yield put(setTagArchiveArticlesServer(data));
    } else {
      yield put(setTagArchiveArticles(data));
    }
  } catch (err) {
    yield put(setTagArchiveArticlesError(err.toString()));
  }
}

export default fetchTagArchiveArticlesSaga;
