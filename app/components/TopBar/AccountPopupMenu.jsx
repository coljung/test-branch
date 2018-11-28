import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';

const styles = {
    userSummary: {
        padding: '10px 20px',
    },
    userPicture: {
        display: 'inline-block',
        verticalAlign: 'top',
        height: '48px',
        width: '48px',
    },
    userInfo: {
        display: 'inline-block',
        margin: '6px 0 0 10px',
    },
    userName: {
        color: '#000',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: '13px',
    },
    userEmail: {
        color: '#666',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: '13px',
    },
    actionMenu: {
        background: '#f5f5f5',
        borderTop: '1px solid #ccc',
        padding: '10px 0',
        width: '100%',
        display: 'table',
    },
    buttonContainer: {
        display: 'table-cell',
        textAlign: 'right',
    },
    button: {
        margin: '0 20px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
        },
    },
};

const AccountPopupMenu = props => (
    [
        <div key='avatar' className={props.classes.userSummary}>
            <Avatar src={props.userImage} className={props.classes.userPicture} />
            <div className={props.classes.userInfo}>
                <div className={props.classes.userName}>{props.userName}</div>
                <div className={props.classes.userEmail}>{props.userEmail}</div>
            </div>
        </div>,
        <div key='actionmenu' className={props.classes.actionMenu}>
            <div className={props.classes.buttonContainer}>
                <Button variant="outlined" onClick={props.onLogout} className={props.classes.button}>{i18n.t('accountMenu.signOut')}</Button>
            </div>
        </div>,
    ]
);

AccountPopupMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    userImage: PropTypes.string,
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountPopupMenu);
