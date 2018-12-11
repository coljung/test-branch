import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import footerStyle from '../../assets/jss/material-dashboard-pro-react/components/footerStyle';

function Footer(props) {
    const { classes, fluid, white } = props;
    const container = cx({
        [classes.container]: !fluid,
        [classes.containerFluid]: fluid,
        [classes.whiteColor]: white,
    });

    const anchor =
        classes.a +
        cx({
            [` ${classes.whiteColor}`]: white,
        });

    const block = cx({
        [classes.block]: true,
        [classes.whiteColor]: white,
    });

    return (
        <footer className={classes.footer}>
            <div className={container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        {props.routes.map((route, key) => {
                            if (route.visible === undefined || route.visible === null || route.visible === true) {
                                return (
                                    <ListItem className={classes.inlineBlock} key={key}>
                                        <Link to={route.path} className={block}>
                                            {route.name}
                                        </Link>
                                    </ListItem>
                                );
                            }

                            return null;
                        })}
                    </List>
                </div>
                <p className={classes.right}>
                    &copy; {1900 + new Date().getYear()}{' '}
                    <a href='https://ssense.com' className={anchor}>
                        SSENSE
                    </a>
                    , made with love for a better web
                </p>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    fluid: PropTypes.bool,
    white: PropTypes.bool,
    rtlActive: PropTypes.bool,
    routes: PropTypes.array,
};

export default withStyles(footerStyle)(Footer);
