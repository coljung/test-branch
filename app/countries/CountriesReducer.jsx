import { REQUEST_COUNTRIES, RECEIVE_COUNTRIES } from './CountriesActions';

const initialState = {
    countries: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_COUNTRIES:
            return Object.assign({}, state, {
                countries: action.countries,
            });
        default:
            return state;
    }
};
