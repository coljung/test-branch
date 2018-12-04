import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// core components
import Button from '../../components/CustomButtons/Button';

import headerStyle from '../../assets/jss/material-dashboard-pro-react/components/headerStyle';

function Header({...props}) {
    function makeBrand() {
        let name;
        if (props.routes && props.routes.length) {
            props.routes.map((prop, key) => {
                if (prop.collapse) {
                    prop.views.map((prop, key) => {
                        if (prop.path === props.location.pathname) {
                            name = prop.name;
                        }

                        return null;
                    });
                }
                if (prop.path === props.location.pathname) {
                    name = prop.name;
                }
                return null;
            });
        }

        if (name) {
            return name;
        } else {
            return 'Default Brand Name';
        }
    }

    const {classes, color} = props;
    const appBarClasses = cx({
        [' ' + classes[color]]: color,
    });

    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button href='#' className={classes.title} color='transparent'>
                        {makeBrand()}
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
    rtlActive: PropTypes.bool,
};

export default withRouter(withStyles(headerStyle)(Header));
