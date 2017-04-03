import { RECEIVE_STORES, RECEIVE_STORE_DETAIL, RECEIVE_STORE_SAVE, CLEAR_STORE_STATE, RECEIVE_CURRENT_STORE } from './StoreActions';

const initialState = {
    stores: {
        collection: [],
    },
    store: null,
    currentStore: null,
    currentStoreId: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_STORES:
            return Object.assign({}, state, {
                stores: action.stores,
            });
        case RECEIVE_STORE_DETAIL:
        case RECEIVE_STORE_SAVE:
            return Object.assign({}, state, {
                store: action.store,
            });
        case CLEAR_STORE_STATE:
            return Object.assign({}, state, {
                store: null,
            });
        case RECEIVE_CURRENT_STORE:
            return Object.assign({}, state, {
                currentStore: action.currentStore,
                currentStoreId: action.currentStore ? action.currentStore.id : null,
            });
        default:
            return state;
    }
};
