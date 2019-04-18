import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

// general styles
import '@ssense/ui-component-library/lib/assets/css/material-dashboard-pro-react.css';

import App from './App';

i18n.init({
    lng: 'en',
    escapeInterpolation: true,
    resources: {
        en: {
            translation: {
                appTitle: 'Purchase Order',
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
