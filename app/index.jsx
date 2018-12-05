import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from './App';

import './dashboard/assets/scss/material-dashboard-pro-react.css?v=1.4.0';

i18n.init({
    lng: 'en',
    escapeInterpolation: true,
    resources: {
        en: {
            translation: {
                appTitle: 'App Title',
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

const rootElement = (
    <AppContainer>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </AppContainer>
);

ReactDOM.render(rootElement, document.getElementById('app'));
