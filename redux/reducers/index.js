import { combineReducers } from "redux";
import panelReducer from "./panelReducer";
import themeReducer from "./themeReducer";
import articlesReducer from "./articlesReducer";
import quickNewsReducer from "./quickNewsReducer";
import archiveArticlesReducer from "./archiveReducer";

export default combineReducers({
  panels: panelReducer,
  theme: themeReducer,
  articles: articlesReducer,
  quickNews: quickNewsReducer,
  archiveArticles: archiveArticlesReducer
});
