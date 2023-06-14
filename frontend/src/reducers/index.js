import { combineReducers } from 'redux';
import threadReducer from './threadReducer';

export default combineReducers({
  thread: threadReducer,
});