import React, { Component } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import theme from './Navigation.scss';

export default class Navigation extends Component {
    render() {
        return (
            <AppBar theme={theme}>
                <span>User Interface Boilerplate</span>
            </AppBar>
        );
    }
}