import { combineReducers } from 'redux';
import decks from './modules/decks';

const rootReducer = combineReducers({
  decks
});

export default rootReducer;
