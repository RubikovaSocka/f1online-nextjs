import { combineReducers } from "redux";
import panelReducer from "./panelReducer";
import themeReducer from "./themeReducer";
import articlesReducer from "./articlesReducer";
import quickNewsReducer from "./quickNewsReducer";
import f1ResultsReducer from "./f1ResultsReducer";
import archiveArticlesReducer from "./archiveReducer";
import calendarReducer from "./calendarReducer";
import programmeReducer from "./programmeReducer";
import tagArchiveArticlesReducer from "./tagArchiveReducer";
import logoHideReducer from "./logoHideReducer";
import categoriesReducer from "./categoriesReducer";
import liveReducer from "./liveReducer";
import popularReducer from "./popularReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
  panels: panelReducer,
  theme: themeReducer,
  articles: articlesReducer,
  quickNews: quickNewsReducer,
  archiveArticles: archiveArticlesReducer,
  f1Results: f1ResultsReducer,
  calendar: calendarReducer,
  programme: programmeReducer,
  tagArchiveArticles: tagArchiveArticlesReducer,
  logoTrigger: logoHideReducer,
  categories: categoriesReducer,
  live: liveReducer,
  popular: popularReducer,
  products: productsReducer,
});
