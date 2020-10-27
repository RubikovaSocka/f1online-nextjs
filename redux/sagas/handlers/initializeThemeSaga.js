import { call, put } from "redux-saga/effects";
import { getTheme } from "../../apis/themesLS";
import { setTheme } from "../../actions/themeActions";
import { THEMES } from "../../../constants";

function* initializeThemeSaga() {
  try {
    const data = yield call(getTheme);
    yield put(setTheme(data));
  } catch (err) {
    yield put(setTheme(THEMES.LIGHT));
  }
}

export default initializeThemeSaga;
