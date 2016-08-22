import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import combinedReducers from './reducers.js';

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(thunkMiddleware),
        devTools()
    );
    return createStore(
        combinedReducers,
        initialState,
        enhancer
    );
}