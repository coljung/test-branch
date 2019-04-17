/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';
import SearchForm from '../exampleComponents/SearchForm';
import ListingTable from '../exampleComponents/ListingTable';
import * as PayloadData from '../examplePayloadData/examplePayload';

const ListingView = props => (
    <React.Fragment>
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <SearchForm
                    statusOptions={PayloadData.statusOptions}
                    seasonYearOptions={PayloadData.seasonYearOptions}
                    genderOptions={PayloadData.genderOptions}
                    deliveryOptions={PayloadData.deliveryOptions}
                    supplierOptions={PayloadData.supplierOptions}
                    brandOptions={PayloadData.brandOptions}
                    buyerOptions={PayloadData.buyerOptions}
                    styleOptions={PayloadData.styleOptions}
                    approvedOptions={PayloadData.approvedOptions}
                    sentOptions={PayloadData.sentOptions}
                    repeatOptions={PayloadData.repeatOptions}
                ></SearchForm>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <ListingTable
                    purchaseOrderTableData={PayloadData.purchaseOrderData}
                ></ListingTable>
            </Grid>
        </Grid>
    </React.Fragment>
);

ListingView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(ListingView);