import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_FITTINGROOM_DETAIL = 'REQUEST_FITTINGROOM_DETAIL';
export const RECEIVE_FITTINGROOM_DETAIL = 'RECEIVE_FITTINGROOM_DETAIL';
export const RECEIVE_FITTINGROOMS = 'RECEIVE_FITTINGROOMS';
export const REQUEST_FITTINGROOMS = 'REQUEST_FITTINGROOMS';
export const REQUEST_FITTINGROOM_DELETE = 'REQUEST_FITTINGROOM_DELETE';
export const RECEIVE_FITTINGROOM_DELETE = 'RECEIVE_FITTINGROOM_DELETE';
export const REQUEST_FITTINGROOM_SAVE = 'REQUEST_FITTINGROOM_SAVE';
export const RECEIVE_FITTINGROOM_SAVE = 'RECEIVE_FITTINGROOM_SAVE';
export const CLEAR_FITTINGROOM_STATE = 'CLEAR_FITTINGROOM_STATE';

export function clearFittingRoomState() {
    return {
        type: CLEAR_FITTINGROOM_STATE,
    };
}

function requestFittingRoomDetail(id) {
    return {
        type: REQUEST_FITTINGROOM_DETAIL,
        id,
    };
}

function receiveFittingRoomDetail(fittingRoom) {
    return {
        type: RECEIVE_FITTINGROOM_DETAIL,
        fittingRoom,
    };
}

function requestFittingRoomSave(fittingRoom) {
    return {
        type: REQUEST_FITTINGROOM_SAVE,
        fittingRoom,
    };
}

function receiveFittingRoomSave(fittingRoom) {
    return {
        type: RECEIVE_FITTINGROOM_SAVE,
        fittingRoom,
    };
}

function receiveFittingRooms(fittingRooms) {
    return {
        type: RECEIVE_FITTINGROOMS,
        fittingRooms,
    };
}

export function getFittingRoomDetail(id) {
    return (dispatch) => {
        dispatch(requestFittingRoomDetail(id));

        return request
            .get(`${getApiUrl()}fitting-rooms/${id}`)
            .then(
                res => dispatch(receiveFittingRoomDetail(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function deleteFittingRoom(fittingRoomId) {
    return (dispatch) => {
        dispatch({ type: REQUEST_FITTINGROOM_DELETE });

        return request
            .del(`${getApiUrl()}fitting-rooms/${fittingRoomId}`)
            .then(
                res => dispatch({ type: RECEIVE_FITTINGROOM_DELETE, id: fittingRoomId }),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveFittingRoom(fittingRoom) {
    return (dispatch) => {
        dispatch(requestFittingRoomSave(fittingRoom));

        if (fittingRoom.id) {
            return request
                .patch(`${getApiUrl()}fitting-rooms/${fittingRoom.id}`)
                .send(fittingRoom)
                .then(
                    (res) => {
                        dispatch(messages({ content: 'Fitting room saved successfully!', response: '', isError: false }));
                        return dispatch(receiveFittingRoomSave(res.body));
                    },
                    err => dispatch(messages({ content: err, response: err.response, isError: true })),
                );
        }

        return request
            .post(`${getApiUrl()}fitting-rooms`)
            .send(fittingRoom)
            .then(
                (res) => {
                    dispatch(messages({ content: 'Fitting room saved successfully!', response: '', isError: false }));
                    return dispatch(receiveFittingRoomSave(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function getFittingRooms(storeId = 1, page = 1) {
    return (dispatch) => {
        dispatch({ type: REQUEST_FITTINGROOMS });

        return request.get(`${getApiUrl()}fitting-rooms?store_id=${storeId}&page=${page}`)
            .then(
                res => dispatch(receiveFittingRooms(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
