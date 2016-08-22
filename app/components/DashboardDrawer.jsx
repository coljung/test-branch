import React, { Component } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import Link from 'react-toolbox/lib/link';

export default class DashboardDrawer extends Component {
    render() {
        return (
            <List selectable ripple>
                <ListItem caption='Dashboard Main' leftIcon='settings_system_daydream' to="/" />
                <ListItem caption='Dashboard Secondary' leftIcon='settings_system_daydream' to="/dashboard-secondary" />
            </List>
        );
    }
}