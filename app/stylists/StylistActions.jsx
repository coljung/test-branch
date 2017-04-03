import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_STYLIST_DETAIL = 'REQUEST_STYLIST_DETAIL';
export const RECEIVE_STYLIST_DETAIL = 'RECEIVE_STYLIST_DETAIL';
export const REQUEST_STYLISTS = 'REQUEST_STYLISTS';
export const RECEIVE_STYLISTS = 'RECEIVE_STYLISTS';
export const REQUEST_STYLIST_DELETE = 'REQUEST_STYLIST_DELETE';
export const RECEIVE_STYLIST_DELETE = 'RECEIVE_STYLIST_DELETE';
export const REQUEST_STYLIST_SAVE = 'REQUEST_STYLIST_SAVE';
export const RECEIVE_STYLIST_SAVE = 'RECEIVE_STYLIST_SAVE';
export const CLEAR_STYLIST_STATE = 'CLEAR_STYLIST_STATE';

export function clearStylistState() {
    return {
        type: CLEAR_STYLIST_STATE,
    };
}

function requestStylistDetail(id) {
    return {
        type: REQUEST_STYLIST_DETAIL,
        id,
    };
}

function receiveStylistDetail(stylist) {
    return {
        type: RECEIVE_STYLIST_DETAIL,
        stylist,
    };
}

function requestStylistSave(stylist) {
    return {
        type: REQUEST_STYLIST_SAVE,
        stylist,
    };
}

function receiveStylistSave(stylist) {
    return {
        type: RECEIVE_STYLIST_SAVE,
        stylist,
    };
}

function receiveStylists(stylists) {
    return {
        type: RECEIVE_STYLISTS,
        stylists,
    };
}

function requestStylists() {
    return {
        type: REQUEST_STYLISTS,
    };
}

export function getStylistDetail(id) {
    return (dispatch) => {
        dispatch(requestStylistDetail(id));

        return request
            .get(`${getApiUrl()}stylists/profile/${id}`)
            .then(
                res => dispatch(receiveStylistDetail(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function deleteStylist(stylistId) {
    return (dispatch) => {
        dispatch({ type: REQUEST_STYLIST_DELETE });

        return request
            .del(`${getApiUrl()}stylists/profile/${stylistId}`)
            .then(
                res => dispatch({ type: RECEIVE_STYLIST_DELETE, id: stylistId }),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveStylist(stylist) {
    return (dispatch) => {
        dispatch(requestStylistSave(stylist));

        if (stylist.id) {
            return request
                .patch(`${getApiUrl()}stylists/profile/${stylist.id}`)
                .send(stylist)
                .then(
                    (res) => {
                        dispatch(messages({ content: 'Stylist saved successfully!', response: '', isError: false }));
                        return dispatch(receiveStylistSave(res.body));
                    },
                    err => dispatch(messages({ content: err, response: err.response, isError: true })),
                );
        }

        return request
            .post(`${getApiUrl()}stylists/profile`)
            .send(stylist)
            .then(
                (res) => {
                    dispatch(messages({ content: 'Stylist saved successfully!', response: '', isError: false }));
                    return dispatch(receiveStylistSave(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getStylists(store = 1, page = 1) {
    return (dispatch) => {
        dispatch(requestStylists());

        return request
            .get(`${getApiUrl()}stylists?store_id=${store}&page=${page}`)
            .then(
                res => dispatch(receiveStylists(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
