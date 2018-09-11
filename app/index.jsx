import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Root from './Root.jsx';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#212121',
        },
    },
    typography: {
        fontSize: 12,
    },
    overrides: {
        MuiDrawer: {
            paper: {
                'background-color': 'black',
            },
        },
    },
});

OfflinePluginRuntime.install({
    ServiceWorker: {
        events: true,
        prefetchRequest: {
            credentials: 'same-origin',
        },
    },
});

ReactDOM.render(
    <AppContainer>
        <MuiThemeProvider theme={theme}>
            <Root />
        </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app'),
);
