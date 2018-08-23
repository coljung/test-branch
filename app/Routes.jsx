import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import { ROUTE_HOME } from './constants/routes';
import NotFound from './components/NotFound';
import Home from './home/Home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path={ROUTE_HOME} component={Home} />
        <Route path='*' component={NotFound} />
    </Route>
);
