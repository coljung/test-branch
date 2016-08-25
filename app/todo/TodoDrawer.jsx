import React, { Component } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import Link from 'react-toolbox/lib/link';

export default class DashboardDrawer extends Component {
    render() {
        return (
            <List selectable ripple>
                <ListItem caption='Todo Application' leftIcon='settings_system_daydream' to="/" />
            </List>
        );
    }
}