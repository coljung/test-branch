import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SSENSEThemeProvider } from '@ssense/ui-internal-components-react/lib/styles/SSENSEThemeProvider';
import Layout from '@ssense/ui-internal-components-react/lib/layouts/Layout';
import indexRoutes from './routes/index.js';
import sidebarRoutes from './routes/sidebar.js';
import logo from '../public/images/SSENSE.png';

class App extends React.Component {
    user = {
        name: 'Maxime Gaudrddeault Proulx',
        avatar: 'https://avatars0.githubusercontent.com/u/4981701?s=460&v=4',
    };

    createLayout = target => (
        <Layout appName='App Name' routes={sidebarRoutes} majorLinks={indexRoutes} user={this.user} logo={logo}>
            {React.createElement(target)}
        </Layout>
    );

    render() {
        return (
            <SSENSEThemeProvider>
                <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                    <Switch>
                        {indexRoutes.map((route, key) => {
                            if (route.redirect) {
                                return <Redirect from={route.path} to={route.pathTo} key={key}/>;
                            }

                            return <Route path={route.path} render={() => this.createLayout(route.component)} key={key} exact={route.exact} />;
                        })}
                    </Switch>
                </BrowserRouter>
            </SSENSEThemeProvider>
        );
    }
}

export default App;
