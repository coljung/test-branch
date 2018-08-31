import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderContent from './common/HeaderContent';

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

const AppHeader = props => (
    <div>
        <AppBar
            position="absolute"
            className={props.classes.appBar}>
            <Toolbar>
                <HeaderContent />
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
                paper: props.classes.drawerPaper,
            }}>
            <div className={props.classes.toolbar} />
            {props.children}
        </Drawer>
    </div>
);

AppHeader.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppHeader);