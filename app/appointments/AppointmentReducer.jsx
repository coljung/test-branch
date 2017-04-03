import {
    RECEIVE_APPOINTMENTS, RECEIVE_APPOINTMENT_DETAIL, SHOW_CREATE_APPOINTMENT_FORM, RECEIVE_ITEMS_BY_SKU,
    REFRESH_ITEMS_SEARCH, RECEIVE_AVAILABILITIES, RECEIVE_SAVE_APPOINTMENT, RECEIVE_DURATIONS, RECEIVE_DURATION,
} from './AppointmentActions';

const initialState = {
    appointments: { collection: [] },
    durations: [],
    saved: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_APPOINTMENTS:
            return Object.assign({}, state, {
                appointments: action.appointments,
                saved: false,
            });
        case RECEIVE_ITEMS_BY_SKU:
            return Object.assign({}, state, {
                items: action.items,
            });
        case REFRESH_ITEMS_SEARCH:
            return Object.assign({}, state, {
                items: [],
            });
        case RECEIVE_APPOINTMENT_DETAIL:
            return Object.assign({}, state, {
                appointment: action.appointment,
                saved: false,
            });
        case SHOW_CREATE_APPOINTMENT_FORM:
            return Object.assign({}, state, {
                appointment: null,
                saved: false,
            });
        case RECEIVE_SAVE_APPOINTMENT:
            return Object.assign({}, state, {
                appointment: action.appointment,
                saved: true,
            });
        case RECEIVE_AVAILABILITIES:
            return Object.assign({}, state, {
                availabilities: action.availabilities,
            });
        case RECEIVE_DURATIONS:
            return Object.assign({}, state, {
                durations: action.durations,
            });
        case RECEIVE_DURATION:
            return Object.assign({}, state, {
                defaultDuration: action.duration,
            });
        default:
            return state;
    }
};
