// Dependencies
import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MainLayout from './components/MainLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import DashboardSecondary from './components/DashboardSecondary.jsx';
import DashboardDrawer from './components/DashboardDrawer.jsx';

import configureStore from './redux/configureStore.js';
let store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route component={MainLayout}>
                        <Route path="/" components={{main: Dashboard, drawer: DashboardDrawer}} />
                        <Route path="/dashboard-secondary" components={{main: DashboardSecondary, drawer: DashboardDrawer}} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}