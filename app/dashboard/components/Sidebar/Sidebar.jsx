import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// core components
import HeaderLinks from '../Header/HeaderLinks';

import sidebarStyle from '../../assets/jss/material-dashboard-pro-react/components/sidebarStyle';

import avatar from '../../assets/img/faces/avatar.jpg';

let ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
    componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.user}
                {this.props.headerLinks}
                {this.props.links}
            </div>
        );
    }
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAvatar: false,
            openComponents: this.activeRoute('/components'),
            openForms: this.activeRoute('/forms'),
            openTables: this.activeRoute('/tables'),
            openMaps: this.activeRoute('/maps'),
            openPages: this.activeRoute('-page'),
            miniActive: true,
        };
        this.activeRoute.bind(this);
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    openCollapse(collapse) {
        const st = {};
        st[collapse] = !this.state[collapse];
        this.setState(st);
    }

    buildLogoLink = () => {
        const renderLogoImage = () => {
            const logoMini =
                `${this.props.classes.logoMini} ${cx({
                    [this.props.classes.logoMiniRTL]: this.props.rtlActive,
                })}`;

            return (
                <a href='https://ssense.com' className={logoMini}>
                    <img src={this.props.logo} alt='logo' className={this.props.classes.img}/>
                </a>
            );
        };

        const renderLogoLink = () => {
            const logoNormal =
                `${this.props.classes.logoNormal} ${cx({
                    [this.props.classes.logoNormalSidebarMini]:
                    this.props.miniActive && this.state.miniActive,
                    [this.props.classes.logoNormalSidebarMiniRTL]:
                    this.props.rtlActive && this.props.miniActive && this.state.miniActive,
                    [this.props.classes.logoNormalRTL]: this.props.rtlActive,
                })}`;
                
            return (
                <a href='https://ssense.com' className={logoNormal}>
                    {this.props.logoText}
                </a>
            );
        };

        const logoClasses =
            `${this.props.classes.logo} ${cx({
                [this.props.classes.whiteAfter]: this.props.bgColor === 'white',
            })}`;

        return (
            <div className={logoClasses}>
                { this.props.logo && renderLogoImage() }
                { this.props.logoText && renderLogoLink() }
            </div>
        );
    };

    render() {
        const {
            classes,
            color,
            image,
            routes,
        } = this.props;

        const itemText =
            `${this.props.classes.itemText} ${cx({
                [this.props.classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
                [this.props.classes.itemTextMiniRTL]:
                this.props.rtlActive && this.props.miniActive && this.state.miniActive,
                [this.props.classes.itemTextRTL]: this.props.rtlActive,
            })}`;

        const itemIcon =
            `${this.props.classes.itemIcon} ${cx({
                [this.props.classes.itemIconRTL]: this.props.rtlActive,
            })}`;

        const collapseItemText =
            `${this.props.classes.collapseItemText} ${cx({
                [this.props.classes.collapseItemTextMini]:
                this.props.miniActive && this.state.miniActive,
                [this.props.classes.collapseItemTextMiniRTL]:
                this.props.rtlActive && this.props.miniActive && this.state.miniActive,
                [this.props.classes.collapseItemTextRTL]: this.props.rtlActive,
            })}`;

        const userWrapperClass =
            `${this.props.classes.user} ${cx({
                [this.props.classes.whiteAfter]: this.props.bgColor === 'white',
            })}`;

        const caret =
            `${this.props.classes.caret} ${cx({
                [this.props.classes.caretRTL]: this.props.rtlActive,
            })}`;

        const collapseItemMini =
            `${this.props.classes.collapseItemMini} ${cx({
                [this.props.classes.collapseItemMiniRTL]: this.props.rtlActive,
            })}`;

        const photo =
            `${this.props.classes.photo} ${cx({
                [this.props.classes.photoRTL]: this.props.rtlActive,
            })}`;

        const user = (
            <div className={userWrapperClass}>
                <div className={photo}>
                    <img src={avatar} className={this.props.classes.avatarImg} alt='...'/>
                </div>
                <List className={classes.list}>
                    <ListItem className={`${this.props.classes.item} ${classes.userItem}`}>
                        <NavLink
                            to={'#'}
                            className={`${this.props.classes.itemLink} ${classes.userCollapseButton}`}
                            onClick={() => this.openCollapse('openAvatar')}>
                            <ListItemText
                                primary='Tania Andrew'
                                secondary={
                                    <b classes={`${caret} ${this.props.classes.userCaret} ${(this.state.openAvatar ? classes.caretActive : '')}`}/>
                                }
                                disableTypography={true}
                                className={`${itemText} ${classes.userItemText}`}
                            />
                        </NavLink>
                        <Collapse in={this.state.openAvatar} unmountOnExit>
                            <List className={`${this.props.classes.list} ${classes.collapseList}`}>
                                <ListItem className={classes.collapseItem}>
                                    <NavLink
                                        to='#'
                                        className={`${classes.itemLink} ${classes.userCollapseLinks}`}>
                                        <span className={collapseItemMini}>
                                            MP
                                        </span>
                                        <ListItemText
                                            primary='My Profile'
                                            disableTypography={true}
                                            className={collapseItemText}/>
                                    </NavLink>
                                </ListItem>
                                <ListItem className={this.props.classes.collapseItem}>
                                    <NavLink
                                        to='#'
                                        className={`${classes.itemLink} ${classes.userCollapseLinks}`}>
                                        <span className={collapseItemMini}>
                                            EP
                                        </span>
                                        <ListItemText
                                            primary='Edit Profile'
                                            disableTypography={true}
                                            className={collapseItemText}/>
                                    </NavLink>
                                </ListItem>
                                <ListItem className={this.props.classes.collapseItem}>
                                    <NavLink
                                        to='#'
                                        className={`${this.props.classes.itemLink} ${this.props.classes.userCollapseLinks}`}>
                                        <span className={collapseItemMini}>
                                            S
                                        </span>
                                        <ListItemText
                                            primary='Settings'
                                            disableTypography={true}
                                            className={collapseItemText}/>
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </div>
        );

        const links = (
            <List className={classes.list}>
                {routes && routes.length && routes.map((prop, key) => {
                    if (prop.redirect) {
                        return null;
                    }
                    if (prop.collapse) {
                        const navLinkClasses =
                            `${this.props.classes.itemLink} ${cx({
                                [` ${this.props.classes.collapseActive}`]: this.activeRoute(prop.path),
                            })}`;

                        return (
                            <ListItem key={key} className={this.props.classes.item}>
                                <NavLink
                                    to={'#'}
                                    className={navLinkClasses}
                                    onClick={() => this.openCollapse(prop.state)}>
                                    <ListItemIcon className={itemIcon}>
                                        {typeof prop.icon === 'string' ? (
                                            <Icon>{prop.icon}</Icon>
                                        ) : (
                                            <prop.icon/>
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={prop.name}
                                        secondary={
                                            <b
                                                className={
                                                    `${caret} ${(this.state[prop.state] ? this.props.classes.caretActive : '')}`
                                                }
                                            />
                                        }
                                        disableTypography={true}
                                        className={itemText}/>
                                </NavLink>
                                <Collapse in={this.state[prop.state]} unmountOnExit>
                                    <List className={`${this.props.classes.list} ${this.props.classes.collapseList}`}>
                                        {prop.views.map((prop2, key2) => {
                                            if (prop2.redirect) {
                                                return null;
                                            }
                                            const innerNavLinkClasses =
                                                `${this.props.classes.collapseItemLink} ${cx({
                                                    [` ${this.props.classes[color]}`]: this.activeRoute(prop2.path),
                                                })}`;

                                            const innerCollapseItemMini =
                                                `${this.props.classes.collapseItemMini} ${cx({
                                                    [this.props.classes.collapseItemMiniRTL]: this.props.rtlActive,
                                                })}`;

                                            return (
                                                <ListItem key={key2} className={this.props.classes.collapseItem}>
                                                    <NavLink to={prop2.path} className={innerNavLinkClasses}>
                                                        <span className={innerCollapseItemMini}>
                                                          {prop2.mini}
                                                        </span>
                                                        <ListItemText
                                                            primary={prop2.name}
                                                            disableTypography={true}
                                                            className={collapseItemText}/>
                                                    </NavLink>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            </ListItem>
                        );
                    }

                    const navLinkClasses =
                        `${this.props.classes.itemLink} ${cx({
                            [` ${this.props.classes[color]}`]: this.activeRoute(prop.path),
                        })}`;

                    return (
                        <ListItem key={key} className={this.props.classes.item}>
                            <NavLink to={prop.path} className={navLinkClasses}>
                                <ListItemIcon className={itemIcon}>
                                    {typeof prop.icon === 'string' ? (
                                        <Icon>{prop.icon}</Icon>
                                    ) : (
                                        <prop.icon/>
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={prop.name}
                                    disableTypography={true}
                                    className={itemText}/>
                            </NavLink>
                        </ListItem>
                    );
                })}
            </List>
        );

        const brand = this.buildLogoLink();

        const drawerPaper =
            `${this.props.classes.drawerPaper} ${cx({
                [this.props.classes.drawerPaperMini]:
                this.props.miniActive && this.state.miniActive,
                [this.props.classes.drawerPaperRTL]: this.props.rtlActive,
            })}`;

        const sidebarWrapper =
            `${this.props.classes.sidebarWrapper} ${cx({
                [this.props.classes.drawerPaperMini]:
                this.props.miniActive && this.state.miniActive,
                [this.props.classes.sidebarWrapperWithPerfectScrollbar]:
                navigator.platform.indexOf('Win') > -1,
            })}`;

        return (
            <div>
                <Hidden mdUp implementation='css'>
                    <Drawer
                        variant='temporary'
                        anchor={this.props.rtlActive ? 'left' : 'right'}
                        open={this.props.open}
                        classes={{
                            paper: `${drawerPaper} ${this.props.classes[`${this.props.bgColor}Background`]}`,
                        }}
                        onClose={this.props.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {brand}
                        <SidebarWrapper
                            className={sidebarWrapper}
                            user={user}
                            headerLinks={<HeaderLinks rtlActive={this.props.rtlActive}/>}
                            links={links}/>
                        {image !== undefined ? (
                            <div
                                className={this.props.classes.background}
                                style={{backgroundImage: `url(${image})`}}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation='css'>
                    <Drawer
                        onMouseOver={() => this.setState({ miniActive: false })}
                        onMouseOut={() => this.setState({ miniActive: true })}
                        anchor={this.props.rtlActive ? 'right' : 'left'}
                        variant='permanent'
                        open
                        classes={{
                            paper: `${drawerPaper} ${this.props.classes[`${this.props.bgColor}Background`]}`,
                        }}>
                        {brand}
                        <SidebarWrapper
                            className={sidebarWrapper}
                            user={user}
                            links={links}/>
                        {image !== undefined ? (
                            <div
                                className={this.props.classes.background}
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

Sidebar.defaultProps = {
    bgColor: 'blue',
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
    rtlActive: PropTypes.bool,
    color: PropTypes.oneOf([
        'white',
        'red',
        'orange',
        'green',
        'blue',
        'purple',
        'rose',
    ]),
    logo: PropTypes.string,
    logoText: PropTypes.string,
    image: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
};

export default withRouter(withStyles(sidebarStyle)(Sidebar));
