import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PhotoAlbum, LibraryBooks } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from './components/TopBar/AppHeader';
import Header from './dashboard/components/Header/Header';
import Footer from './dashboard/components/Footer/Footer';
import Sidebar from './dashboard/components/Sidebar/Sidebar';
import NotificationManager from './notifications/NotificationManager';
import appStyle from './dashboard/assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx';
//
// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//         height: 440,
//         zIndex: 1,
//         overflow: 'hidden',
//         position: 'relative',
//         display: 'flex',
//     },
//     content: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.default,
//         padding: theme.spacing.unit * 3,
//         minWidth: 0,
//     },
//     toolbar: {
//         ...theme.mixins.toolbar,
//     },
//     listItem: {
//         color: theme.palette.primary.main,
//     },
// });

const Layout = props => {
    return (
        <div className={props.classes.wrapper}>
            <Sidebar
                logoText='SSENSE'
                logo='https://res.cloudinary.com/ssenseweb/image/upload/v1471963917/web/ssense_logo_v2.svg'
                color='blue'
                bgColor='black'
                {...props.rest} />
            <div className={props.classes.mainPanel}>
                <Header/>
                <main className={props.classes.content}>
                    {props.children}
                </main>
                <Footer fluid/>
            </div>
        </div>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default withStyles(appStyle)(Layout);
