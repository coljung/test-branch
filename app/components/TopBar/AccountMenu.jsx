import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Typography, Popover } from '@material-ui/core';
import AccountPopupMenu from './AccountPopupMenu';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paper: {
        props: {
            square: true,
            elevation: 3,
        },
    },
};

class AccountMenu extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        userInfo: PropTypes.object.isRequired,
        logOut: PropTypes.func,
    };

    state = {
        popupOpen: false,
        anchorEl: null,
    };

    handleClose = () => {
        this.setState({
            popupOpen: false,
            anchorEl: null,
        });
    };

    handlePopupOpenState = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            popupOpen: true,
        });
    };

    handleLogout = () => {
        this.props.logOut().then(() => this.handleClose());
    };

    render() {
        return (
        [
            <Typography key='accountname' color="textPrimary">
                {this.props.userInfo.name}
            </Typography>,
            <IconButton
                key='icon'
                aria-owns={this.state.anchorEl ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handlePopupOpenState}
                color="inherit">
                <Avatar src={this.props.userInfo.image} />
            </IconButton>,
            <Popover
                key='accountmenu'
                open={this.state.popupOpen}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                PaperProps={{
                    square: true,
                    elevation: 1,
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <AccountPopupMenu
                    userName={this.props.userInfo.name}
                    userEmail={this.props.userInfo.email}
                    userImage={this.props.userInfo.image}
                    onLogout={this.handleLogout} />
            </Popover>,
        ]);
    }
}

export default withStyles(styles)(AccountMenu);
