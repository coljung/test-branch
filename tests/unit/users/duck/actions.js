/* eslint-disable import/no-namespace */
// eslint-disable-next-line import/no-extraneous-dependencies
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../../src/ApiClient';
import * as types from '../../../../src/user/duck/types';
import * as actions from '../../../../src/user/duck/actions';
import clientMiddleware from '../../../../src/middleware/clientMiddleware';

import {
    authenticate as authenticateOperation,
    logout as logoutOperation,
    me as meOperation,
} from '../../../../src/user/duck/operations';

const client = new ApiClient();
const middlewares = [thunk, clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('Users action creators', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Should authenticate', () => {
        const expectedAction = {
            types: [types.LOGIN_REQUEST, types.LOGIN_SUCCEED, types.LOGIN_FAILED],
            promise: authenticateOperation,
        };

        expect(actions.authenticate()).toEqual(expectedAction);
    });

    it('Should logout', () => {
        const expectedAction = {
            types: [types.LOGOUT_REQUEST, types.LOGOUT_SUCCESS, types.LOGOUT_FAILED],
            promise: logoutOperation,
        };

        expect(actions.logout()).toEqual(expectedAction);
    });

    it.skip('Should get me request', async () => {
        nock(UI_HOST)
            .get('')
            .query({ scopes: '' })
            .reply(200, { user: {} });

        const expectedActions = [
            { type: types.USER_REQUEST },
            { result: { user: {} }, type: types.USER_SUCCESS },
        ];

        const store = mockStore({});

        await store.dispatch(actions.me());

        expect(store.getActions()).toEqual(expectedActions);
    });
});
