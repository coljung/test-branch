import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
        action: {
            active: 'rgba(255, 255, 255, 0.20)',
            hover: 'rgba(255, 255, 255, 0.15)',
            hoverOpacity: 0.15,
        },
    },
    typography: {
        fontSize: 12,
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

ReactDOM.render(
    <AppContainer>
        <MuiThemeProvider theme={theme}>
            <Root />
        </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app'),
);
