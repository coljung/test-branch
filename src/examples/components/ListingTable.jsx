import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import ViewList from '@material-ui/icons/ViewList';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import { Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import ShareIcon from '@material-ui/icons/Share';

// core components
import Card from '@ssense/ui-component-library/lib/components/Card/Card';
import CardHeader from '@ssense/ui-component-library/lib/components/Card/CardHeader';
import CardBody from '@ssense/ui-component-library/lib/components/Card/CardBody';
import CardIcon from '@ssense/ui-component-library/lib/components/Card/CardIcon';
import CardFooter from '@ssense/ui-component-library/lib/components/Card/CardFooter';
import Pagination from '@ssense/ui-component-library/lib/components/Pagination/Pagination';
import Table from '@ssense/ui-component-library/lib/components/Table/Table';
import Button from '@ssense/ui-component-library/lib/components/CustomButtons/Button';

// Style
// eslint-disable-next-line max-len
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

dashboardStyle.cardTextAlign = {
    textAlign: 'right',
};

const PurchaseOrderListingTable = (props) => {
    const genders = {
        F: 'Female',
        M: 'Male',
    };

    const keyColumnMapping = {
        ID: {
            title: 'PO ID',
        },
        name: {
            title: 'Name',
        },
        supplier: {
            title: 'Vendor',
        },
        brand: {
            title: 'Designer',
        },
        gender: {
            title: 'Gender',
            method: po => (genders[po.gender] ? genders[po.gender] : 'Non-binary'),
        },
        start: {
            title: 'Start date',
        },
        cancel: {
            title: 'Cancel date',
        },
        approved: {
            title: 'Approved',
            method: po => (po.approved ? 'Yes' : 'No'),
        },
        repeat: {
            title: 'Repeat',
            method: po => (po.repeat ? 'Yes' : 'No'),
        },
        status: {
            title: 'Status',
            method: po => po.status.toString(),
        },
        sent: {
            title: 'Sent',
            method: po => po.status.toString(),
        },
        total: {
            title: 'Total',
            method: po => `${po.total} ${po.currency}`,
        },
        send: {
            title: 'Send to Vendor',
            method: () => <Checkbox />,
            class: 'tableCellCentered',
        },
        actions: {
            title: 'Actions',
            method: () => (
                <div>
                    <ShareIcon>Share</ShareIcon>
                    <EditIcon>Edit</EditIcon>
                </div>
            ),
        },
    };

    const organizePurchaseOrderData = po =>
        Object.keys(keyColumnMapping).map((key) => {
            const column = keyColumnMapping[key];
            if (column.method) {
                return column.method(po);
            }
            return po[key];
        });

    const purchaseOrderTableRows = props.purchaseOrderTableData.map(po =>
        organizePurchaseOrderData(po),
    );

    const purchaseOrderTableColumTitles = Object.keys(keyColumnMapping).map(
        key => keyColumnMapping[key].title,
    );

    const customCellClassesIndexes = Object.keys(keyColumnMapping)
        .map((key) => {
            if (keyColumnMapping[key].class) {
                return Object.keys(keyColumnMapping).indexOf(key);
            }
            return false;
        })
        .filter(i => i);

    const customCellClassesList = Object.keys(keyColumnMapping)
        .map((key) => {
            if (keyColumnMapping[key].class) {
                return keyColumnMapping[key].class;
            }
            return false;
        })
        .filter(i => i);

    const { classes } = props;

    return (
        <Card>
            <CardHeader color="primary" icon>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CardIcon color="primary">
                            <ViewList />
                        </CardIcon>
                        <h2 className={classes.cardIconTitle}>Listing table</h2>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ textAlign: 'right' }}>
                        <Button color="success" className={classes.cardHeaderBtn}>execute modal action</Button>
                    </Grid>
                </Grid>
            </CardHeader>
            <CardBody className={classes.cardTextAlign}>
                <Table
                    striped
                    marginless
                    hover
                    tableHead={purchaseOrderTableColumTitles}
                    tableData={purchaseOrderTableRows}
                    customCellClasses={customCellClassesList}
                    customClassesForCells={customCellClassesIndexes}
                />
                <Pagination
                    pages={[
                        { active: true, text: 1 },
                        { text: 2 },
                        { text: 3 },
                        { text: 4 },
                    ]}
                />
            </CardBody>
        </Card>
    );
};

PurchaseOrderListingTable.propTypes = {
    classes: PropTypes.object.isRequired,
    purchaseOrderTableData: PropTypes.array.isRequired,
};

export default withStyles(dashboardStyle)(PurchaseOrderListingTable);
