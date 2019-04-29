import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import LocalOffer from '@material-ui/icons/LocalOffer';

// core components
import Card from '@ssense/ui-component-library/lib/components/Card/Card';
import CardHeader from '@ssense/ui-component-library/lib/components/Card/CardHeader';
import CardIcon from '@ssense/ui-component-library/lib/components/Card/CardIcon';
import CardFooter from '@ssense/ui-component-library/lib/components/Card/CardFooter';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// Style
// eslint-disable-next-line max-len
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

const Home = props => (
    <React.Fragment>
        <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Icon>info_outline</Icon>
                        </CardIcon>
                        <p className={props.classes.cardCategory}>UI-Boilerplate</p>
                        <h3 className={props.classes.cardTitle}>Ready</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <LocalOffer />
                            Let's get cooking
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
        </Grid>
    </React.Fragment>
);

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Home);
