import React from 'react';
import PropTypes from 'prop-types';
import {
    DialogContentText, Divider, Typography,
    List, ListItem, ListItemIcon, ListItemText,
    InboxIcon, StarIcon, MailIcon, DeleteIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ModalDialog from './ModalDialog';
import AppHeader from './TopBar/AppHeader';
import NotificationManager from '../notifications/NotificationManager';
import Button from '../dashboard/components/CustomButtons/Button.jsx';

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

class Index extends React.Component {
    render() {
        return (
            <div className={this.props.classes.root}>
                <NotificationManager />
                <AppHeader>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon className={this.props.classes.listItem} />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" classes={{ primary: this.props.classes.listItem }} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon className={this.props.classes.listItem} />
                            </ListItemIcon>
                            <ListItemText primary="Starred" classes={{ primary: this.props.classes.listItem }} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <MailIcon className={this.props.classes.listItem} />
                            </ListItemIcon>
                            <ListItemText primary="All mail" classes={{ primary: this.props.classes.listItem }} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DeleteIcon className={this.props.classes.listItem} />
                            </ListItemIcon>
                            <ListItemText primary="Trash" classes={{ primary: this.props.classes.listItem }} />
                        </ListItem>
                    </List>
                </AppHeader>
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.toolbar} />

                    <Button>Allo</Button>
                </main>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
