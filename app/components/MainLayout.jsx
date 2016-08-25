import React, { Component } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Link from 'react-toolbox/lib/link';
import { Layout, Panel, NavDrawer } from 'react-toolbox';
import Navigation from './Navigation.jsx';
import theme from './MainLayout.scss';

export default class MainLayout extends Component {
    render() {
        return (
            <div>
            <Navigation />
            <Layout theme={theme}>
                <NavDrawer pinned={true}>
                    {this.props.drawer}
                </NavDrawer>
                <Panel>   
                    <div style={{ flex: 1, overflowY: 'auto', padding: 15 }}>
                        {this.props.main}
                    </div>
                </Panel>
            </Layout>
            </div>
        );
    }
}