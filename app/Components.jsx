import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import dashboardStyle from './dashboard/assets/jss/material-dashboard-pro-react/views/dashboardStyle';
import GridContainer from './dashboard/components/Grid/GridContainer';
import GridItem from './dashboard/components/Grid/GridItem';
import Card from './dashboard/components/Card/Card';

const Components = props => (
    <React.Fragment>
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    allo
                </Card>
            </GridItem>
        </GridContainer>
    </React.Fragment>
);

Components.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Components;
