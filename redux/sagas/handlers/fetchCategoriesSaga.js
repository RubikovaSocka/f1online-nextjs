import { call, put } from "redux-saga/effects";
import fetchCategories from "../../apis/fetchCategories";
import { setCategories } from "../../actions/categoriesActions";

function* handleFetchCategories() {
  const categoriesData = yield call(fetchCategories);
  yield put(setCategories(categoriesData));
}

export default handleFetchCategories;
