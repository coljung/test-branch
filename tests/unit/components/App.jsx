import i18n from 'i18next';
import React from 'react';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../src/ApiClient';
import clientMiddleware from '../../../src/middleware/clientMiddleware';
import App from '../../../src/App';

function setup(state = {}, props = {}) {
    const initialState = {
        userReducer: {
            user: { name: 'Foo Bar' },
        },
        ...state,
    };

    const initialProps = {
        location: {},
        children: [],
        me: jest.fn(),
        user: { name: 'Foo Bars' },
        ...props,
    };

    const client = new ApiClient();
    const middlewares = [thunk, clientMiddleware(client)];

    const store = configureMockStore(middlewares)(initialState);

    return { initialProps, store };
}

let props;

describe('App', () => {
    let mockStore;

    beforeAll(() => {
        props = { location: { pathname: 'pathname' } };
    });

    it('should render correctly', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('appTitle').returns('UI-Boilerplate');

        const { initialProps, store } = setup();

        const app = renderer.create(
            <App
                location={{ pathname: 'pathname' }}
                store={store}
                {...initialProps} />,
        );
        expect(app).toMatchSnapshot();

        i18nStub.restore();
    });
});
