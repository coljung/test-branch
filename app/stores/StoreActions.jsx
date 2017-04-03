import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_STORES = 'REQUEST_STORES';
export const RECEIVE_STORES = 'RECEIVE_STORES';
export const REQUEST_STORE_DETAIL = 'REQUEST_STORE_DETAIL';
export const RECEIVE_STORE_DETAIL = 'RECEIVE_STORE_DETAIL';
export const REQUEST_STORE_SAVE = 'REQUEST_STORE_SAVE';
export const RECEIVE_STORE_SAVE = 'RECEIVE_STORE_SAVE';
export const RECEIVE_CURRENT_STORE = 'RECEIVE_CURRENT_STORE';
export const CLEAR_STORE_STATE = 'CLEAR_STORE_STATE';

function requestStoreDetail(id) {
    return {
        type: REQUEST_STORE_DETAIL,
        id,
    };
}

function receiveStoreDetail(store) {
    return {
        type: RECEIVE_STORE_DETAIL,
        store,
    };
}

function requestStoreSave(store) {
    return {
        type: REQUEST_STORE_SAVE,
        store,
    };
}

function receiveStoreSave(store) {
    return {
        type: RECEIVE_STORE_SAVE,
        store,
    };
}

function requestStores() {
    return {
        type: REQUEST_STORES,
    };
}

function receiveStores(stores) {
    return {
        type: RECEIVE_STORES,
        stores,
    };
}

function receiveCurrentStore(currentStore) {
    return {
        type: RECEIVE_CURRENT_STORE,
        currentStore,
    };
}

export function clearStoreState() {
    return {
        type: CLEAR_STORE_STATE,
    };
}

export function setCurrentStore(currentStore) {
    return (dispatch) => {
        localStorage.setItem('currentStore', JSON.stringify({
            timestamp: new Date(),
            store: currentStore,
        }));
        dispatch(receiveCurrentStore(currentStore));
    };
}

export function resetCurrentStore() {
    return (dispatch) => {
        if (localStorage.getItem('currentStore')) {
            localStorage.removeItem('currentStore');
        }
        dispatch(receiveCurrentStore(null));
    };
}

export function setStoreFromStorage() {
    return (dispatch) => {
        if (localStorage.getItem('currentStore')) {
            const retrieveStore = JSON.parse(localStorage.getItem('currentStore'));
            dispatch(receiveCurrentStore(retrieveStore.store));
        }
    };
}

export function getStoreDetail(id) {
    return (dispatch) => {
        dispatch(requestStoreDetail(id));

        return request
            .get(`${getApiUrl()}stores/${id}`)
            .then(
                res => dispatch(receiveStoreDetail(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveStore(store) {
    return (dispatch) => {
        dispatch(requestStoreSave(store));

        let req = null;
        if (store.id) {
            req = request.patch(`${getApiUrl()}stores/${store.id}`);
        } else {
            req = request.post(`${getApiUrl()}stores`);
        }

        return req.send(store)
            .then(
                (res) => {
                    dispatch(messages({ content: 'Store saved successfully!', response: '', isError: false }));
                    return dispatch(receiveStoreSave(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getStores(page = 1) {
    return (dispatch) => {
        dispatch(requestStores());
        return request
            .get(`${getApiUrl()}stores?page=${page}`)
            .then(
                res => dispatch(receiveStores(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
