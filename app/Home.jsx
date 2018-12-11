import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import Refresh from '@material-ui/icons/Refresh';
import Edit from '@material-ui/icons/Edit';
import Place from '@material-ui/icons/Place';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Language from '@material-ui/icons/Language';

// core components
import GridContainer from './dashboard/components/Grid/GridContainer.jsx';
import GridItem from './dashboard/components/Grid/GridItem.jsx';
import Table from './dashboard/components/Table/Table.jsx';
import Button from './dashboard/components/CustomButtons/Button.jsx';
import Danger from './dashboard/components/Typography/Danger.jsx';
import Card from './dashboard/components/Card/Card.jsx';
import CardHeader from './dashboard/components/Card/CardHeader.jsx';
import CardIcon from './dashboard/components/Card/CardIcon.jsx';
import CardBody from './dashboard/components/Card/CardBody.jsx';
import CardFooter from './dashboard/components/Card/CardFooter.jsx';

import dashboardStyle from './dashboard/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

const usFlag = require('./dashboard/assets/img/flags/US.png');
const deFlag = require('./dashboard/assets/img/flags/DE.png');
const auFlag = require('./dashboard/assets/img/flags/AU.png');
const gbFlag = require('./dashboard/assets/img/flags/GB.png');
const roFlag = require('./dashboard/assets/img/flags/RO.png');
const brFlag = require('./dashboard/assets/img/flags/BR.png');

const Home = props => (
    <React.Fragment>
        <GridContainer>
            <GridItem xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <p className={props.classes.cardCategory}>Used Space</p>
                        <h3 className={props.classes.cardTitle}>
                            49/50 <small>GB</small>
                        </h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <Danger>
                                <Warning/>
                            </Danger>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Get more space
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Store/>
                        </CardIcon>
                        <p className={props.classes.cardCategory}>Revenue</p>
                        <h3 className={props.classes.cardTitle}>$34,245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <DateRange/>
                            Last 24 Hours
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <Icon>info_outline</Icon>
                        </CardIcon>
                        <p className={props.classes.cardCategory}>Fixed Issues</p>
                        <h3 className={props.classes.cardTitle}>75</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <LocalOffer/>
                            Tracked from Github
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <i className="fab fa-twitter"/>
                        </CardIcon>
                        <p className={props.classes.cardCategory}>Followers</p>
                        <h3 className={props.classes.cardTitle}>+245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <Update/>
                            Just Updated
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="success" icon>
                        <CardIcon color="success">
                            <Language/>
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Global Sales by Top Locations
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="space-between">
                            <GridItem xs={12} sm={12} md={5}>
                                <Table
                                    tableData={[
                                        [
                                            <img src={usFlag} alt="us_flag"/>,
                                            'USA',
                                            '2.920',
                                            '53.23%',
                                        ],
                                        [
                                            <img src={deFlag} alt="us_flag"/>,
                                            'Germany',
                                            '1.300',
                                            '20.43%',
                                        ],
                                        [
                                            <img src={auFlag} alt="us_flag"/>,
                                            'Australia',
                                            '760',
                                            '10.35%',
                                        ],
                                        [
                                            <img src={gbFlag} alt="us_flag"/>,
                                            'United Kingdom',
                                            '690',
                                            '7.87%',
                                        ],
                                        [
                                            <img src={roFlag} alt="us_flag"/>,
                                            'Romania',
                                            '600',
                                            '5.94%',
                                        ],
                                        [
                                            <img src={brFlag} alt="us_flag"/>,
                                            'Brasil',
                                            '550',
                                            '4.34%',
                                        ],
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        <h3>Manage Listings</h3>
        <br/>
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card product className={props.classes.cardHover}>
                    <CardHeader image className={props.classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src='https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1541431461/gwhqalyvo08wfmf4slge.jpg'
                                 alt="..."/>
                        </a>
                    </CardHeader>
                    <CardBody>
                        <div className={props.classes.cardHoverUnder}>
                            <Tooltip
                                id="tooltip-top"
                                title="View"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="transparent" simple justIcon>
                                    <ArtTrack className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="success" simple justIcon>
                                    <Refresh className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="danger" simple justIcon>
                                    <Edit className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                        </div>
                        <h4 className={props.classes.cardProductTitle}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Cozy 5 Stars Apartment
                            </a>
                        </h4>
                        <p className={props.classes.cardProductDesciprion}>
                            The place is close to Barceloneta Beach and bus stop just 2
                            min by walk and near to "Naviglio" where you can enjoy the
                            main night life in Barcelona.
                        </p>
                    </CardBody>
                    <CardFooter product>
                        <div className={props.classes.price}>
                            <h4>$899/night</h4>
                        </div>
                        <div className={`${props.classes.stats} ${props.classes.productStats}`}>
                            <Place/> Barcelona, Spain
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card product className={props.classes.cardHover}>
                    <CardHeader image className={props.classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src='https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1543848645/rll5f5ooui8jhglmsmfd.jpg'
                                 alt="..."/>
                        </a>
                    </CardHeader>
                    <CardBody>
                        <div className={props.classes.cardHoverUnder}>
                            <Tooltip
                                id="tooltip-top"
                                title="View"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="transparent" simple justIcon>
                                    <ArtTrack className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="success" simple justIcon>
                                    <Refresh className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="danger" simple justIcon>
                                    <Edit className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                        </div>
                        <h4 className={props.classes.cardProductTitle}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Office Studio
                            </a>
                        </h4>
                        <p className={props.classes.cardProductDesciprion}>
                            The place is close to Metro Station and bus stop just 2 min by
                            walk and near to "Naviglio" where you can enjoy the night life
                            in London, UK.
                        </p>
                    </CardBody>
                    <CardFooter product>
                        <div className={props.classes.price}>
                            <h4>$1.119/night</h4>
                        </div>
                        <div className={`${props.classes.stats} ${props.classes.productStats}`}>
                            <Place/> London, UK
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card product className={props.classes.cardHover}>
                    <CardHeader image className={props.classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src='https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1543848654/veecqck7m8lp0lvsn10s.jpg'
                                 alt="..."/>
                        </a>
                    </CardHeader>
                    <CardBody>
                        <div className={props.classes.cardHoverUnder}>
                            <Tooltip
                                id="tooltip-top"
                                title="View"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="transparent" simple justIcon>
                                    <ArtTrack className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="success" simple justIcon>
                                    <Refresh className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="danger" simple justIcon>
                                    <Edit className={props.classes.underChartIcons}/>
                                </Button>
                            </Tooltip>
                        </div>
                        <h4 className={props.classes.cardProductTitle}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Beautiful Castle
                            </a>
                        </h4>
                        <p className={props.classes.cardProductDesciprion}>
                            The place is close to Metro Station and bus stop just 2 min by
                            walk and near to "Naviglio" where you can enjoy the main night
                            life in Milan.
                        </p>
                    </CardBody>
                    <CardFooter product>
                        <div className={props.classes.price}>
                            <h4>$459/night</h4>
                        </div>
                        <div className={`${props.classes.stats} ${props.classes.productStats}`}>
                            <Place/> Milan, Italy
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    </React.Fragment>
);

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Home);
