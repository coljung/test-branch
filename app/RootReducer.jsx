import { combineReducers } from 'redux';
import StoreReducer from './stores/StoreReducer';
import FittingRoomReducer from './fitting-rooms/FittingRoomReducer';
import StylistReducer from './stylists/StylistReducer';
import AppointmentReducer from './appointments/AppointmentReducer';
import CountriesReducer from './countries/CountriesReducer';
import CustomersReducer from './customers/CustomersReducer';
import Message from './notifications/NotificationReducer';

export default combineReducers({
    StoreReducer,
    FittingRoomReducer,
    StylistReducer,
    AppointmentReducer,
    Message,
    CountriesReducer,
    CustomersReducer,
});
