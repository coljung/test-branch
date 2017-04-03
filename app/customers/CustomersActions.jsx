import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_SEARCH_CUSTOMER = 'REQUEST_SEARCH_CUSTOMER';
export const RECEIVE_SEARCH_CUSTOMER = 'RECEIVE_SEARCH_CUSTOMER';
export const REQUEST_ONE_CUSTOMER = 'REQUEST_ONE_CUSTOMER';
export const RECEIVE_ONE_CUSTOMER = 'RECEIVE_ONE_CUSTOMER';
export const REQUEST_SAVE_CUSTOMER = 'REQUEST_SAVE_CUSTOMER';
export const RECEIVE_SAVE_CUSTOMER = 'RECEIVE_SAVE_CUSTOMER';
export const PREPARE_CREATE_CUSTOMER_FORM = 'PREPARE_CREATE_CUSTOMER_FORM';
export const PREPARE_CUSTOMER_SEARCH = 'PREPARE_CUSTOMER_SEARCH';

function receiveSearchCustomer(customers) {
    return {
        type: RECEIVE_SEARCH_CUSTOMER,
        customers,
    };
}

function requestSearchCustomer() {
    return {
        type: REQUEST_SEARCH_CUSTOMER,
    };
}

function requestSaveCustomer() {
    return {
        type: REQUEST_SAVE_CUSTOMER,
    };
}

export function prepareCreateCustomerForm() {
    return {
        type: PREPARE_CREATE_CUSTOMER_FORM,
    };
}

export function prepareCustomerSearch() {
    return {
        type: PREPARE_CUSTOMER_SEARCH,
    };
}

function receiveOneCustomer(customer) {
    return {
        type: RECEIVE_ONE_CUSTOMER,
        customer,
    };
}

function receiveSaveCustomer(customer) {
    return {
        type: RECEIVE_SAVE_CUSTOMER,
        customer,
    };
}

function requestOneCustomer() {
    return {
        type: REQUEST_ONE_CUSTOMER,
    };
}

export function searchCustomer(search) {
    return (dispatch) => {
        dispatch(requestSearchCustomer());
        return request
            .get(`${getApiUrl()}customers/search`)
            .query({ email: search })
            .then(
                res => dispatch(receiveSearchCustomer(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getOneCustomer(id) {
    return (dispatch) => {
        dispatch(requestOneCustomer());
        return request
            .get(`${getApiUrl()}customers/${id}`)
            .then(
                res => dispatch(receiveOneCustomer(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveCustomer(customer) {
    return (dispatch) => {
        dispatch(requestSaveCustomer(customer));
        return request
            .post(`${getApiUrl()}customers`)
            .send(customer)
            .then(
                (res) => {
                    dispatch(messages({ content: 'Customer saved successfully!', response: '', isError: false }));
                    return dispatch(receiveSaveCustomer(res.body));
                },
                (err) => {
                    dispatch(messages({ content: err, response: err.response, isError: true }));
                    return dispatch(receiveSaveCustomer(customer));
                },
            );
    };
}
