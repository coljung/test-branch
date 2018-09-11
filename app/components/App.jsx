import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import ModalDialog from './ModalDialog';
import AppHeader from './AppHeader';
import NotificationManager from '../notifications/NotificationManager';

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
        minWidth: 0, // So the Typography noWrap works
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

                    <ModalDialog buttonText='Super Secret Password' title='Super Secret Password'>
                        <DialogContentText>
                            <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                        </DialogContentText>
                    </ModalDialog>
                </main>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
