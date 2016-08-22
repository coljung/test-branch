import { combineReducers } from 'redux';
import textReducer from './textReducer.js';

const combinedReducers = combineReducers({
    textReducer
});

export default combinedReducers;