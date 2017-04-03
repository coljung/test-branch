import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import StoreList from './stores/StoreList';
import StoreForm from './stores/StoreForm';
import FittingRoomList from './fitting-rooms/FittingRoomList';
import FittingRoomForm from './fitting-rooms/FittingRoomForm';
import StylistList from './stylists/StylistList';
import StylistForm from './stylists/StylistForm';
import AppointmentBoard from './appointments/AppointmentBoard';
import AppointmentForm from './appointments/AppointmentForm';

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

export const ROUTE_STORE_LIST = '/admin/stores';
export const ROUTE_APPOINTMENTS_LIST = '/admin/appointments';
export const ROUTE_STYLISTS_LIST = '/admin/stylists';
export const ROUTE_FITTING_ROOM_LIST = '/admin/fitting-rooms';

export default (
    <Route path="admin" component={App} onEnter={authOnEnter} onChange={authOnChange} >
        <IndexRoute components={AppointmentBoard} />
        <Route path={ROUTE_STORE_LIST}>
            <IndexRoute component={StoreList}/>
            <Route path=':id' component={StoreForm} />
            <Route path=":id/tab/:tab" component={StoreForm} />
        </Route>
        <Route path={ROUTE_APPOINTMENTS_LIST}>
            <IndexRoute components={AppointmentBoard} />
            <Route path=":id" component={AppointmentForm} />
        </Route>
        <Route path={ROUTE_STYLISTS_LIST}>
            <IndexRoute components={StylistList} />
            <Route path=":id" component={StylistForm} />
            <Route path=":id/tab/:tab" component={StylistForm} />
        </Route>
        <Route path={ROUTE_FITTING_ROOM_LIST}>
            <IndexRoute component={FittingRoomList}/>
            <Route path=':id' component={FittingRoomForm} />
        </Route>
    </Route>
);
