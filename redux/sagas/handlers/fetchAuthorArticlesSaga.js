import { call, put, select } from "redux-saga/effects";
import fetchArchiveArticles from "../../apis/fetchArchiveArticlesApi";
import {
  setAuthorArticles,
  setAuthorArticlesError,
} from "../../actions/authorArchiveActions";
import getAuthorFromSlug from "../../apis/getAuthorFromSlug";

function* fetchAuthorArticlesSaga({ pageNumber, perPage, authorSlug }) {
  try {
    const author = yield call(getAuthorFromSlug, authorSlug);
    const data = yield call(fetchArchiveArticles, {
      pageNumber: pageNumber,
      perPage: perPage,
      authorId: author.id,
    });
    yield put(
      setAuthorArticles({ articlesData: data, authorData: author })
    );
  } catch (err) {
    yield put(setAuthorArticlesError(err.toString()));
  }
}

export default fetchAuthorArticlesSaga;
