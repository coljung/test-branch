import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './dashboard/components/Header/Header';
import Footer from './dashboard/components/Footer/Footer';
import Sidebar from './dashboard/components/Sidebar/Sidebar';
import appStyle from './dashboard/assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx';

const Layout = props => {
    return (
        <div className={props.classes.wrapper}>
            <Sidebar
                logoText={props.appName}
                logo='https://www.wagjag.com/coupons/vfiles/4538-0580e9fc9ebfc6cd36f805a4b0a37198.png'
                color='white'
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
    appName: PropTypes.string.isRequired,
};

export default withStyles(appStyle)(Layout);
