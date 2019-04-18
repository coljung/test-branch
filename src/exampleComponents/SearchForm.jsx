import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid } from '@material-ui/core';

// @material-ui/icons components
import Mail from '@material-ui/icons/Mail';

// core components
import Card from '@ssense/ui-component-library/lib/components/Card/Card';
import CardHeader from '@ssense/ui-component-library/lib/components/Card/CardHeader';
import CardBody from '@ssense/ui-component-library/lib/components/Card/CardBody';
import CardIcon from '@ssense/ui-component-library/lib/components/Card/CardIcon';
import CardFooter from '@ssense/ui-component-library/lib/components/Card/CardFooter';
import Button from '@ssense/ui-component-library/lib/components/CustomButtons/Button';
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

// Other components
import PurchaseOrderAttributeSelect from './FormSelectField';
import PurchaseOrderAttributeRadio from './FormRadioField';

class PurchaseOrderSearchForm extends React.Component {
    render() {
        const {
            classes,
            statusOptions,
            genderOptions,
            seasonYearOptions,
            deliveryOptions,
            supplierOptions,
            brandOptions,
            buyerOptions,
            styleOptions,
            approvedOptions,
            sentOptions,
            repeatOptions,
        } = this.props;

        const formStyle = {
            paddingBottom: '50',
        };

        return (
            <Card>
                <CardHeader color="primary" icon>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CardIcon color="primary">
                            <Mail />
                        </CardIcon>
                        <h4 className={this.props.classes.cardIconTitle}>Search</h4>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} style={{ textAlign: 'right' }}>
                        <Button color="success" style={{ margin: '20 10 -10 0' }}>CREATE NEW MODEL</Button>
                      </Grid>
                    </Grid>
                </CardHeader>
                <CardBody>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Status"
                                options={statusOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Gender"
                                options={genderOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Season/Year"
                                options={seasonYearOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Delivery"
                                options={deliveryOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Supplier"
                                options={supplierOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Brand"
                                options={brandOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Buyer"
                                options={buyerOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25' }}>
                            <PurchaseOrderAttributeSelect
                                classes={classes}
                                title="Style"
                                options={styleOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25', marginTop: '25' }}>
                            <PurchaseOrderAttributeRadio
                                title="Approved"
                                options={approvedOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25', marginTop: '25' }}>
                            <PurchaseOrderAttributeRadio
                                title="Sent"
                                options={sentOptions}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginBottom: '25', marginTop: '25' }}>
                            <PurchaseOrderAttributeRadio
                                title="Repeat"
                                options={repeatOptions}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={3} style={{ marginTop: '0' }}>
                            <Button color="info" >Submit</Button>
                        </Grid>
                    </Grid>
                </CardBody>
                <CardFooter />
            </Card>
        );
    }
}

PurchaseOrderSearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
    statusOptions: PropTypes.array.isRequired,
    genderOptions: PropTypes.array.isRequired,
    seasonYearOptions: PropTypes.array.isRequired,
    deliveryOptions: PropTypes.array.isRequired,
    supplierOptions: PropTypes.array.isRequired,
    brandOptions: PropTypes.array.isRequired,
    buyerOptions: PropTypes.array.isRequired,
    styleOptions: PropTypes.array.isRequired,
    approvedOptions: PropTypes.array.isRequired,
    sentOptions: PropTypes.array.isRequired,
    repeatOptions: PropTypes.array.isRequired,
};

export default withStyles(dashboardStyle)(PurchaseOrderSearchForm);
