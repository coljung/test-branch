import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, Button } from '@material-ui/core';
import HeaderContent from './HeaderContent';
import AccountMenu from './AccountMenu';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: 240,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class AppHeader extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        enableAuth: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        enableAuth: false,
    };

    state = {
        isLoggedIn: false,
    };

    login = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
    }

    renderAccountMenu = () => (
        <AccountMenu userInfo={{
            name: 'Maxime Gaudreault Proulx',
            email: 'maxime.gaudreault@ssense.com',
            image: 'https://lh5.googleusercontent.com/-RmlDhN9nCwo/AAAAAAAAAAI/AAAAAAAAAAA/Q-_GNwgTgqo/W96-H96/photo.jpg',
        }} />
    );

    renderLoginButton = () => (
        <Button className={this.props.classes.button} variant='text' color='primary' onClick={this.login}>{i18n.t('accountMenu.login')}</Button>
    );

    renderAuthMenu = () => (
        this.state.isLoggedIn ? this.renderAccountMenu() : this.renderLoginButton()
    );

    render() {
        return (
        [
            <AppBar
                key='appbar'
                position="absolute"
                className={this.props.classes.appBar}>
                <Toolbar>
                    <HeaderContent />
                    { this.props.enableAuth && this.renderAuthMenu() }
                </Toolbar>
            </AppBar>,
            <Drawer
                key='drawer'
                variant="permanent"
                classes={{
                    paper: this.props.classes.drawerPaper,
                }}>
                <div className={this.props.classes.toolbar} />
                {this.props.children}
            </Drawer>,
        ]);
    }
}

export default withStyles(styles, { withTheme: true })(AppHeader);
