import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ROUTE_HOME } from './constants/routes';
import Home from './Home';
import NotFound from './NotFound';
import Layout from './Layout';

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
        <Layout appName='App Name'>
            {target}
        </Layout>
    );

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                    <Switch>
                        <Route path={ROUTE_HOME} exact render={() => this.createLayout(<Home />)} />

                        <Route render={() => this.createLayout(<NotFound />)} />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
