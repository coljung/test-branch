import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Card } from '@ssense/ui-internal-components-react/';

const Components = () => (
    <React.Fragment>
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    allo
                </Card>
            </Grid>
        </Grid>
    </React.Fragment>
);

Components.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Components;
