import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Store from '@material-ui/icons/Store';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import Refresh from '@material-ui/icons/Refresh';
import Edit from '@material-ui/icons/Edit';
import Place from '@material-ui/icons/Place';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Language from '@material-ui/icons/Language';

// Style
// eslint-disable-next-line max-len
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

// core components
import Card from '@ssense/ui-component-library/lib/components/Card/Card';
import CardHeader from '@ssense/ui-component-library/lib/components/Card/CardHeader';
import CardIcon from '@ssense/ui-component-library/lib/components/Card/CardIcon';
import CardBody from '@ssense/ui-component-library/lib/components/Card/CardBody';
import CardFooter from '@ssense/ui-component-library/lib/components/Card/CardFooter';
import Table from '@ssense/ui-component-library/lib/components/Table/Table';
import Button from '@ssense/ui-component-library/lib/components/CustomButtons/Button';

import usFlag from '../../../public/images/flags/US.png';
import deFlag from '../../../public/images/flags/DE.png';
import auFlag from '../../../public/images/flags/AU.png';
import gbFlag from '../../../public/images/flags/GB.png';
import roFlag from '../../../public/images/flags/RO.png';
import brFlag from '../../../public/images/flags/BR.png';

const IMGS = [
    'https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1541431461/gwhqalyvo08wfmf4slge.jpg',
    'https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1543848645/rll5f5ooui8jhglmsmfd.jpg',
    'https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1543848654/veecqck7m8lp0lvsn10s.jpg',
];

const General = props => (
    <React.Fragment>
        <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <p className={props.classes.cardCategory}>Used Space</p>
                        <h3 className={props.classes.cardTitle}>
                            49/50 <small>GB</small>
                        </h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Get more space
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Store />
                        </CardIcon>
                        <p className={props.classes.cardCategory}>Revenue</p>
                        <h3 className={props.classes.cardTitle}>$34,245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <DateRange />
                            Last 24 Hours
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
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
                            <LocalOffer />
                            Tracked from Github
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <i className="fab fa-twitter" />
                        </CardIcon>
                        <p className={props.classes.cardCategory}>Followers</p>
                        <h3 className={props.classes.cardTitle}>+245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={props.classes.stats}>
                            <Update />
                            Just Updated
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardHeader color="success" icon>
                        <CardIcon color="success">
                            <Language />
                        </CardIcon>
                        <h4 className={props.classes.cardIconTitle}>
                            Global Sales by Top Locations
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <Grid container justify="space-between">
                            <Grid item xs={12} sm={12} md={5}>
                                <Table
                                    tableData={[
                                        [
                                            <img src={usFlag} alt="us_flag" />,
                                            'USA',
                                            '2.920',
                                            '53.23%',
                                        ],
                                        [
                                            <img src={deFlag} alt="us_flag" />,
                                            'Germany',
                                            '1.300',
                                            '20.43%',
                                        ],
                                        [
                                            <img src={auFlag} alt="us_flag" />,
                                            'Australia',
                                            '760',
                                            '10.35%',
                                        ],
                                        [
                                            <img src={gbFlag} alt="us_flag" />,
                                            'United Kingdom',
                                            '690',
                                            '7.87%',
                                        ],
                                        [
                                            <img src={roFlag} alt="us_flag" />,
                                            'Romania',
                                            '600',
                                            '5.94%',
                                        ],
                                        [
                                            <img src={brFlag} alt="us_flag" />,
                                            'Brasil',
                                            '550',
                                            '4.34%',
                                        ],
                                    ]}
                                />
                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </Grid>
        </Grid>
        <h3>Manage Listings</h3>
        <br />
        <Grid container>
            <Grid item xs={12} sm={12} md={4}>
                <Card product className={props.classes.cardHover}>
                    <CardHeader image className={props.classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={IMGS[0]}
                                alt="..." />
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
                                    <ArtTrack className={props.classes.underChartIcons} />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="success" simple justIcon>
                                    <Refresh className={props.classes.underChartIcons} />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="danger" simple justIcon>
                                    <Edit className={props.classes.underChartIcons} />
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
                            <Place /> Barcelona, Spain
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card product className={props.classes.cardHover}>
                    <CardHeader image className={props.classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={IMGS[1]}
                                alt="..." />
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
                                    <ArtTrack className={props.classes.underChartIcons} />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="success" simple justIcon>
                                    <Refresh className={props.classes.underChartIcons} />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="danger" simple justIcon>
                                    <Edit className={props.classes.underChartIcons} />
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
                            <Place /> London, UK
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card product className={props.classes.cardHover}>
                    <CardHeader image className={props.classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={IMGS[2]}
                                alt="..." />
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
                                    <ArtTrack className={props.classes.underChartIcons} />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="success" simple justIcon>
                                    <Refresh className={props.classes.underChartIcons} />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: props.classes.tooltip }}>
                                <Button color="danger" simple justIcon>
                                    <Edit className={props.classes.underChartIcons} />
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
                            <Place /> Milan, Italy
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
        </Grid>
    </React.Fragment>
);

General.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(General);
