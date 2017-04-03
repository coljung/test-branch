import { RECEIVE_SEARCH_CUSTOMER, RECEIVE_ONE_CUSTOMER, RECEIVE_SAVE_CUSTOMER, PREPARE_CREATE_CUSTOMER_FORM, PREPARE_CUSTOMER_SEARCH } from './CustomersActions';

const initialState = {
    customers: { collection: [] },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_CUSTOMER:
            return Object.assign({}, state, {
                customers: action.customers,
            });
        case RECEIVE_ONE_CUSTOMER:
            return Object.assign({}, state, {
                customer: action.customer,
            });
        case RECEIVE_SAVE_CUSTOMER:
            return Object.assign({}, state, {
                saved_customer: action.customer,
            });
        case PREPARE_CUSTOMER_SEARCH:
            return Object.assign({}, state, {
                customer: null,
            });
        case PREPARE_CREATE_CUSTOMER_FORM:
            return Object.assign({}, state, {
                saved_customer: null,
            });
        default:
            return state;
    }
};
