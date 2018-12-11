import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout';
import indexRoutes from './routes/index.js';
import sidebarRoutes from './routes/sidebar.js';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#212121',
        },
        action: {
            active: 'rgba(255, 255, 255, 0.20)',
            hover: 'rgba(255, 255, 255, 0.15)',
            hoverOpacity: 0.15,
        },
    },
    typography: {
        fontSize: 12,
        useNextVariants: true,
    },
    shape: {
        borderRadius: 0,
    },
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: 'black',
            },
        },
        MuiButton: {
            textPrimary: {
                color: '#212121',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
        MuiToolbar: {
            regular: {
                minHeight: '55px !important',
            },
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
});

class App extends React.Component {
    createLayout = target => (
        <Layout appName='App Name' routes={sidebarRoutes} majorLinks={indexRoutes}>
            {React.createElement(target)}
        </Layout>
    );

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
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
            </MuiThemeProvider>
        );
    }
}

export default App;
