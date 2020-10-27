import { call } from "redux-saga/effects";
import { saveTheme } from "../../apis/themesLS";

function* saveThemeSaga({ theme }) {
  yield call(saveTheme, theme);
}

export default saveThemeSaga;
