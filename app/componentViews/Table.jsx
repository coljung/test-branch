import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import TableIcon from '@material-ui/icons/TableChart';
import { Table as SSENSETable } from '@ssense/ui-internal-components-react/';

import GridContainer from '../dashboard/components/Grid/GridContainer';
import GridItem from '../dashboard/components/Grid/GridItem';
import Card from '../dashboard/components/Card/Card';
import CardHeader from '../dashboard/components/Card/CardHeader';
import CardIcon from '../dashboard/components/Card/CardIcon';
import CardBody from '../dashboard/components/Card/CardBody';
// import Table from '../dashboard/components/Table/Table';

import { cardTitle } from '../dashboard/assets/jss/material-dashboard-pro-react.jsx';

const style = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: '15px',
        marginBottom: '0px',
    },
    right: {
        textAlign: 'right',
    },
    center: {
        textAlign: 'center',
    },
};

const Table = props => (
    <React.Fragment>
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <TableIcon/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Simple Table &nbsp;<small>- Simplest table</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>

                        {/*<code className='language-jsx'>*/}
                            {/*<span className="token tag">*/}
                                {/*<span className="token tag">*/}
                                    {/*<span className="token punctuation">&lt;</span>*/}
                                    {/*Table*/}
                                {/*</span>*/}
                                {/*<span className="token attr-name">tableData</span>*/}
                                {/*<span className="token script language-javascript">*/}
                                    {/*<span className="token script-punctuation punctuation">=</span>*/}
                                    {/*<span className="token punctuation">{</span>*/}
                                    {/*<span class="token punctuation">[</span>*/}
                                    {/*<span className="token script language-javascript">*/}
                                        {/*<span className="token punctuation">[</span>*/}
                                        {/*<span className="token punctuation">]</span>*/}
                                    {/*</span>*/}
                                        {/*['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],*/}
                                    {/*<span className="token punctuation">]</span>*/}
                                    {/*<span className="token punctuation">}</span>*/}
                                {/*</span>*/}
                                {/*<span className="token punctuation">&gt;</span>*/}
                            {/*</span>*/}

                            {/*<Table*/}
                                {/*tableData={[*/}
                                    {/*['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],*/}
                                    {/*['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],*/}
                                    {/*['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],*/}
                                    {/*['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],*/}
                                    {/*['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],*/}
                                    {/*['Mason Porter', 'Chile', 'Gloucester', '$78,615'],*/}
                                {/*]} />*/}
                        {/*</code>*/}

                        <SSENSETable
                            tableData={[
                                ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                            ]} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <TableIcon/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Headered Table &nbsp;<small>- Simple table with headers</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <SSENSETable
                            tableHead={['Name', 'Country', 'City', 'Salary']}
                            tableData={[
                                ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                            ]} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <TableIcon/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Hover Table &nbsp;<small>- Table with effects on mouse hover</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <SSENSETable
                            hover
                            tableHead={['Name', 'Country', 'City', 'Salary']}
                            tableData={[
                                ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                            ]} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <TableIcon/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Striped Table &nbsp;<small>- Table with alternate color stripes</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <SSENSETable
                            striped
                            tableHead={['Name', 'Country', 'City', 'Salary']}
                            tableData={[
                                ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                            ]} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <TableIcon/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Colors &nbsp;<small>- Table with defined colors</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <SSENSETable
                            tableHead={['Name', 'Country', 'City', 'Salary']}
                            tableData={[
                                {
                                    color: 'info',
                                    data: ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                },
                                {
                                    color: 'danger',
                                    data: ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                },
                                {
                                    color: 'warning',
                                    data: ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                },
                                {
                                    color: 'success',
                                    data: ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                },
                                {
                                    color: 'primary',
                                    data: ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                },
                                {
                                    color: 'rose',
                                    data: ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                                },
                            ]} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <TableIcon/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Total &nbsp;<small>- Table with total row</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <SSENSETable
                            tableHead={['Name', 'Country', 'City', 'Salary']}
                            tableData={[
                                ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                                { total: true, colspan: '2', value: '$200,000' },
                            ]}
                            customCellClasses={[
                                props.classes.right,
                            ]}
                            customClassesForCells={[3]}
                            customHeadCellClasses={[
                                props.classes.right,
                            ]}
                            customHeadClassesForCells={[3]} />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    </React.Fragment>
);

Table.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Table);
