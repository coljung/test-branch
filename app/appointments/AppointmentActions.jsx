import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../Helpers';
import * as QueryString from 'querystring';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_APPOINTMENTS = 'REQUEST_APPOINTMENTS';
export const RECEIVE_APPOINTMENTS = 'RECEIVE_APPOINTMENTS';
export const REQUEST_APPOINTMENT_DETAIL = 'REQUEST_APPOINTMENT_DETAIL';
export const RECEIVE_APPOINTMENT_DETAIL = 'RECEIVE_APPOINTMENT_DETAIL';
export const REQUEST_SAVE_APPOINTMENT = 'REQUEST_SAVE_APPOINTMENT';
export const RECEIVE_SAVE_APPOINTMENT = 'RECEIVE_SAVE_APPOINTMENT';
export const SHOW_CREATE_APPOINTMENT_FORM = 'SHOW_CREATE_APPOINTMENT_FORM';
export const RECEIVE_AVAILABILITIES = 'RECEIVE_AVAILABILITIES';
export const REQUEST_ITEMS_BY_SKU = 'REQUEST_ITEMS_BY_SKU';
export const RECEIVE_ITEMS_BY_SKU = 'RECEIVE_ITEMS_BY_SKU';
export const REFRESH_ITEMS_SEARCH = 'REFRESH_ITEMS_SEARCH';
export const RECEIVE_DURATIONS = 'RECEIVE_DURATIONS';
export const RECEIVE_DURATION = 'RECEIVE_DURATION';

export function showCreateAppointmentForm() {
    return {
        type: SHOW_CREATE_APPOINTMENT_FORM,
    };
}

export function refreshItemsSearch() {
    return {
        type: REFRESH_ITEMS_SEARCH,
    };
}

function requestAppointments() {
    return {
        type: REQUEST_APPOINTMENTS,
    };
}

function requestSaveAppointment(appointment) {
    return {
        type: REQUEST_SAVE_APPOINTMENT,
        appointment,
    };
}

function requestAppointmentDetail() {
    return {
        type: REQUEST_APPOINTMENT_DETAIL,
    };
}

function receiveSaveAppointment(appointment) {
    return {
        type: RECEIVE_SAVE_APPOINTMENT,
        appointment,
    };
}

function receiveOneAppointment(appointment) {
    return {
        type: RECEIVE_APPOINTMENT_DETAIL,
        appointment,
    };
}

function receiveAppointments(appointments) {
    return {
        type: RECEIVE_APPOINTMENTS,
        appointments,
    };
}

function receiveAvailabilities(availabilities) {
    return {
        type: RECEIVE_AVAILABILITIES,
        availabilities,
    };
}

function requestItemsBySku() {
    return {
        type: REQUEST_ITEMS_BY_SKU,
    };
}

function receiveItemsBySku(items) {
    return {
        type: RECEIVE_ITEMS_BY_SKU,
        items,
    };
}

function receiveDurations(durations) {
    return {
        type: RECEIVE_DURATIONS,
        durations: durations.map(duration => duration.duration),
    };
}

function receiveDuration(duration) {
    return {
        type: RECEIVE_DURATION,
        duration: duration.duration,
    };
}

export function getAppointments(params = { store_id: null, stylist_id: null, date_from: null, date_to: null, page: 1, when: 'any' }) {
    return (dispatch) => {
        dispatch(requestAppointments());

        return request
            .get(`${getApiUrl()}appointments?${QueryString.stringify(params)}`)
            .end()
            .then(
                res => dispatch(receiveAppointments(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getAppointmentDetail(id) {
    return (dispatch) => {
        dispatch(requestAppointmentDetail());
        return request
            .get(`${getApiUrl()}appointments/${id}`)
            .then(
                res => dispatch(receiveOneAppointment(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveAppointment(appointment) {
    return (dispatch) => {
        dispatch(requestSaveAppointment(appointment));

        appointment.items = appointment.items.map(item => item.sku);

        if (!appointment.stylist_id) {
            delete appointment.stylist_id;
        }

        let req = null;
        if (appointment.id) {
            req = request.patch(`${getApiUrl()}appointments/${appointment.id}`);
        } else {
            delete appointment.id;
            req = request.post(`${getApiUrl()}appointments`);
        }

        return req.send(appointment)
            .then(
                (res) => {
                    dispatch(messages({ content: 'Appointment saved successfully!', response: '', isError: false }));
                    dispatch(receiveSaveAppointment(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getAvailabilities(storeId, stylistId, duration) {
    const query = { store_id: storeId, duration };
    if (stylistId) {
        query.stylist_id = stylistId;
    }
    return dispatch => (
        request
            .get(`${getApiUrl()}appointments/schedule`)
            .query(query)
            .then(
                res => dispatch(receiveAvailabilities(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            )
    );
}

export function getItemsBySku(sku, storeId) {
    return (dispatch) => {
        dispatch(requestItemsBySku());
        return request
            .get(`${getApiUrl()}appointments/products/${sku}`)
            .query({ store_id: storeId })
            .then(
                res => dispatch(receiveItemsBySku(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getDurations() {
    return dispatch => (
        request.get(`${getApiUrl()}appointment/durations`)
            .then(
                res => dispatch(receiveDurations(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            )
    );
}

export function getDefaultDuration(productCount) {
    return dispatch => (
        request.get(`${getApiUrl()}appointment/duration`)
            .query({ product_count: productCount })
            .then(
                res => dispatch(receiveDuration(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            )
    );
}
