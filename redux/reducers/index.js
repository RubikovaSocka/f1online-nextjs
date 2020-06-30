import { combineReducers } from 'redux';
import panelReducer from './panelReducer';
import themeReducer from './themeReducer';

export default combineReducers({
  panels: panelReducer,
  theme: themeReducer
});