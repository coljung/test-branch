import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import i18n from 'i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// @ssense-ui/components
// eslint-disable-next-line max-len
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/layouts/dashboardStyle';
import { SSENSEThemeProvider } from '@ssense/ui-component-library/lib/styles/SSENSEThemeProvider';
import Header from '@ssense/ui-component-library/lib/layouts/common/Header/Header';
import Sidebar from '@ssense/ui-component-library/lib/layouts/common/Sidebar/Sidebar';

// routes
import indexRoutes from './routes/index';
import sidebarRoutes from './routes/sidebar';
import configureStore from './configureStore';
import ApiClient from './ApiClient';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: true,
            user: {
                name: 'User Fullname',
            },
            fixedClasses: 'dropdown',
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.sidebarMinimize = this.sidebarMinimize.bind(this);
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    sidebarMinimize() {
        this.setState({ miniActive: !this.state.miniActive });
    }

    render() {
        const { classes, ...rest } = this.props;
        const client = new ApiClient();
        const store = configureStore(client);
        const mainPanel =
          `${classes.mainPanel} ${cx
              ({ [classes.mainPanelSidebarMini]: this.state.miniActive })
          }`;
        return (
            <SSENSEThemeProvider>
                <Provider store={store}>
                    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                        <div className={classes.wrapper}>
                            <Sidebar
                                routes={sidebarRoutes}
                                user={this.user}
                                handleDrawerToggle={this.handleDrawerToggle}
                                open={this.state.mobileOpen}
                                miniActive={this.state.miniActive}
                                {...rest} />
                            <div className={mainPanel}>
                                <Header
                                    sidebarMinimize={this.sidebarMinimize.bind(this)}
                                    miniActive={this.state.miniActive}
                                    routes={sidebarRoutes}
                                    title={i18n.t('appTitle')}
                                    handleDrawerToggle={this.handleDrawerToggle}
                                    {...rest} />
                                <main className={classes.content}>
                                    <div className={classes.container}>
                                        <Switch>
                                            {indexRoutes.map((route, key) =>
                                                <Route
                                                    path={route.path}
                                                    render={props => (
                                                        // pass the sub-routes down to keep nesting
                                                        <route.component {...props} />
                                                    )}
                                                    key={key}
                                                    exact={route.exact} />)}
                                        </Switch>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </BrowserRouter>
                </Provider>
            </SSENSEThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(App);
