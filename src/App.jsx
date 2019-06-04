import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// @ssense-ui/components
import { SSENSEThemeProvider } from '@ssense/ui-component-library/lib/styles/SSENSEThemeProvider';
import Layout from '@ssense/ui-component-library/lib/layouts/Layout';

// routes
import indexRoutes from './routes/index';
import sidebarRoutes from './routes/sidebar';
import configureStore from './configureStore';
import ApiClient from 'middleware/ApiClient';

class App extends React.Component {

    render() {
        const client = new ApiClient();
        const store = configureStore(client);

        const childRoutes = (<Switch>
            {indexRoutes.map((route, key) =>
                <Route
                    path={route.path}
                    render={props => (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} />
                    )}
                    key={key}
                    exact={route.exact} />)}
        </Switch>)
        return (
            <SSENSEThemeProvider>
                <Provider store={store}>
                    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                      <Layout
                          routes={sidebarRoutes}
                          title={i18n.t('appTitle')}
                          childRoutes={childRoutes}
                        />
                    </BrowserRouter>
                </Provider>
            </SSENSEThemeProvider>
        );
    }
}

export default App;
