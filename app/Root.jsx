import i18n from 'i18next';
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import Routes from './Routes';
import resources from './locales';

// Global Styles
import './styles/styles';

i18n.init({
    lng: 'en',
    load: 'languageOnly',
    resources,
});

export default class Root extends Component {
    render() {
        return (
            <Router routes={Routes} history={browserHistory} />
        );
    }
}
