import React, { Component } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Layout, Panel, NavDrawer } from 'react-toolbox';
import Link from 'react-toolbox/lib/link';
import Navigation from './Navigation.jsx';
import theme from './MainLayout.scss';

export default class MainLayout extends Component {
    render() {
        console.log(theme);
        return (
            <Layout theme={theme}>
                <NavDrawer pinned={true}>
                    {this.props.drawer}
                </NavDrawer>
                <Panel>   
                    <Navigation />
                    <div style={{ padding: 15 }}>
                        {this.props.main}
                    </div>
                </Panel>
            </Layout>
        );
    }
}