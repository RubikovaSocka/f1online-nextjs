import { combineReducers } from 'redux';
import panelReducer from './panelReducer';

export default combineReducers({
  panels: panelReducer
});