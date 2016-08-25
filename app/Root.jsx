// Dependencies
import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MainLayout from './components/MainLayout.jsx';
import TodoContainer from './todo/TodoContainer.jsx';
import TodoDrawer from './todo/TodoDrawer.jsx';

import configureStore from './configureStore.js';
let store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route component={MainLayout}>
                        <Route path="/" components={{main: TodoContainer, drawer: TodoDrawer}} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}