import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './dashboard/components/Header/Header';
import Footer from './dashboard/components/Footer/Footer';
import Sidebar from './dashboard/components/Sidebar/Sidebar';
import appStyle from './dashboard/assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx';

const Layout = props => (
    <div className={props.classes.wrapper}>
        <Sidebar
            routes={props.routes}
            logoText={props.appName}
            logo='https://www.wagjag.com/coupons/vfiles/4538-0580e9fc9ebfc6cd36f805a4b0a37198.png'
            color='white'
            bgColor='black'
            {...props.rest} />
        <div className={props.classes.mainPanel}>
            <Header routes={props.routes} />
            <main className={props.classes.content}>
                <div className={props.classes.container}>
                    {props.children}
                </div>
            </main>
            <Footer routes={props.majorLinks} fluid />
        </div>
    </div>
);

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    appName: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object),
    majorLinks: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(appStyle)(Layout);
