import { RECEIVE_FITTINGROOM_DETAIL, RECEIVE_FITTINGROOMS, RECEIVE_FITTINGROOM_DELETE, RECEIVE_FITTINGROOM_SAVE, CLEAR_FITTINGROOM_STATE } from './FittingRoomActions';

const initialState = {
    fittingRooms: {
        collection: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_FITTINGROOMS:
            return Object.assign({}, state, {
                fittingRooms: action.fittingRooms,
            });
        case RECEIVE_FITTINGROOM_DELETE:
            const collection = state.fittingRooms.collection.filter(fr => fr.id !== action.id);
            return Object.assign({}, state, {
                fittingRooms: { collection, meta: state.fittingRooms.meta },
            });
        case RECEIVE_FITTINGROOM_DETAIL:
        case RECEIVE_FITTINGROOM_SAVE:
            return Object.assign({}, state, {
                fittingRoom: action.fittingRoom,
            });
        case CLEAR_FITTINGROOM_STATE:
            return Object.assign({}, state, {
                fittingRoom: null,
            });
        default:
            return state;
    }
};
