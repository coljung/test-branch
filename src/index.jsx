import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

// general styles
import '@ssense/ui-component-library/lib/assets/css/material-dashboard-pro-react.css';

import App from './App';
import configureStore from './configureStore';
import ApiClient from './ApiClient';

i18n.init({
    lng: 'en',
    escapeInterpolation: true,
    resources: {
        en: {
            translation: {
                appTitle: 'Microservice name',
                notification: {
                    errorFound: 'Error found',
                },
                sideMenu: {
                    home: 'Home',
                },
                spinner: {
                    loading: 'Loading...',
                },
                404: {
                    title: '404!',
                    description: 'Page not found',
                },
                home: {
                    welcome: 'Welcome!',
                },
                modal: {
                    saveButton: 'OK',
                    cancelButton: 'Cancel',
                },
                accountMenu: {
                    signOut: 'Sign out',
                    login: 'Login',
                },
            },
        },
    },
});

const client = new ApiClient();
const store = configureStore(client);

const rootElement = (
    <AppContainer>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>
    </AppContainer>
);

ReactDOM.render(rootElement, document.getElementById('app'));
