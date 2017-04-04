import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';


const requireAuth = ((next, replace, callback) => {
	// @todo NEED TO AUTHENTICATE/AUTHORIZE HERE
    callback();
});

const authOnEnter = ((next, replace, callback) => {
    requireAuth(next, replace, callback);
});

const authOnChange = ((prev, next, replace, callback) => {
    requireAuth(next, replace, callback);
});

// For testing purposes
export const ROUTE_TODO = '/todo';

export default (
    <Route path="admin" component={App} onEnter={authOnEnter} onChange={authOnChange} >
        <IndexRoute components={AppointmentBoard} />
        <Route path={ROUTE_TODO}>
            <IndexRoute component={StoreList}/>
            <Route path=':id' component={StoreForm} />
            <Route path=":id/tab/:tab" component={StoreForm} />
        </Route>
    </Route>
);
