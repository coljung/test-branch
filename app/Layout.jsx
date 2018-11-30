import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PhotoAlbum, LibraryBooks } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from './components/TopBar/AppHeader';
import NotificationManager from './notifications/NotificationManager';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    listItem: {
        color: theme.palette.primary.main,
    },
});

const Layout = props => (
    <div className={props.classes.root}>
        <NotificationManager />
        <AppHeader>
            <List>
                <ListItem button key='Albums'>
                    <ListItemIcon><PhotoAlbum /></ListItemIcon>
                    <ListItemText primary='Albums' />
                </ListItem>
                <ListItem button key='Posts'>
                    <ListItemIcon><LibraryBooks /></ListItemIcon>
                    <ListItemText primary='Posts' />
                </ListItem>
            </List>
        </AppHeader>
        <main className={props.classes.content}>
            <div className={props.classes.toolbar} />

            {props.children}
        </main>
    </div>
);

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default withStyles(styles)(Layout);
