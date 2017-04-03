import { RECEIVE_STYLISTS, RECEIVE_STYLIST_DETAIL, RECEIVE_STYLIST_SAVE, CLEAR_STYLIST_STATE, RECEIVE_STYLIST_DELETE } from './StylistActions';

const initialState = {
    stylists: {
        collection: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_STYLISTS:
            return Object.assign({}, state, {
                stylists: action.stylists,
            });
        case RECEIVE_STYLIST_DELETE:
            const collection = state.stylists.collection.filter(s => s.id !== action.id);
            return Object.assign({}, state, {
                stylists: { collection, meta: state.stylists.meta },
            });
        case RECEIVE_STYLIST_DETAIL:
        case RECEIVE_STYLIST_SAVE:
            return Object.assign({}, state, {
                stylist: action.stylist,
            });
        case CLEAR_STYLIST_STATE:
            return Object.assign({}, state, {
                stylist: null,
            });
        default:
            return state;
    }
};
