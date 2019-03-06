import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// @ssense-ui/components
import { SSENSEThemeProvider } from '@ssense/ui-internal-components-react/lib/styles/SSENSEThemeProvider';
import Header from '@ssense/ui-internal-components-react/lib/layouts/common/Header/Header';
import Sidebar from '@ssense/ui-internal-components-react/lib/layouts/common/Sidebar/Sidebar';
import appStyle from '@ssense/ui-internal-components-react/lib/assets/jss/material-dashboard-pro-react/layouts/dashboardStyle';

// routes
import indexRoutes from './routes/index.js';
import sidebarRoutes from './routes/sidebar.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: false,
            user: {
                name: 'Maxime Gaudrddeault Proulx',
                avatar: 'https://avatars0.githubusercontent.com/u/4981701?s=460&v=4',
            },
            fixedClasses: 'dropdown',
        };
        // this.resizeFunction = this.resizeFunction.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.sidebarMinimize = this.sidebarMinimize.bind(this);
    }

    // componentDidUpdate(e) {
    //     if (e.history.location.pathname !== e.location.pathname) {
    //         this.refs.mainPanel.scrollTop = 0;
    //         if (this.state.mobileOpen) {
    //             this.setState({ mobileOpen: false });
    //         }
    //     }
    // }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    sidebarMinimize() {
        this.setState({ miniActive: !this.state.miniActive });
    }

    // createLayout = target => (
    //     <Layout
    //         appName={target.name}
    //         routes={sidebarRoutes}
    //         majorLinks={indexRoutes}
    //         user={this.user}
    //     >
    //         {React.createElement(target.component)}
    //     </Layout>
    // );

    render() {
        const { classes, ...rest } = this.props;
        const mainPanel =
          `${classes.mainPanel}  ${cx({
            [classes.mainPanelSidebarMini]: this.state.miniActive,
            [classes.mainPanelWithPerfectScrollbar]:
              navigator.platform.indexOf("Win") > -1
          })}`;
        return (
            <SSENSEThemeProvider>
                <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                    <div className={classes.wrapper}>
                        <Sidebar
                            routes={sidebarRoutes}
                            user={this.user}
                            color='white'
                            bgColor='black'
                            handleDrawerToggle={this.handleDrawerToggle}
                            open={this.state.mobileOpen}
                            miniActive={this.state.miniActive}
                            {...rest} />
                        <div className={mainPanel}>
                            <Header
                                sidebarMinimize={this.sidebarMinimize.bind(this)}
                                miniActive={this.state.miniActive}
                                routes={sidebarRoutes}
                                title="Microservice Name"
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
            </SSENSEThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(appStyle)(App);
