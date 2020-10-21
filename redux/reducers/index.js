import { combineReducers } from "redux";
import panelReducer from "./panelReducer";
import themeReducer from "./themeReducer";
import articlesReducer from "./articlesReducer";

export default combineReducers({
  panels: panelReducer,
  theme: themeReducer,
  articles: articlesReducer
});
