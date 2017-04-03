import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES';

function requestCountries() {
    return {
        type: REQUEST_COUNTRIES,
    };
}

function receiveCountries(countries) {
    return {
        type: RECEIVE_COUNTRIES,
        countries,
    };
}

export function getCountries(language = 'en') {
    return (dispatch) => {
        dispatch(requestCountries());
        return request
            .get(`${getApiUrl()}products/countries`)
            .query({ language })
            .then(
                res => dispatch(receiveCountries(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
