import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ROUTE_HOME } from '../constants/routes';

export default class CustomNavigation extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        triggerMenuCollapse: PropTypes.func,
    };

    state = {
        current: this.props.pathname,
    };

    handleClick = (e) => {
        this.setState({ current: e.key });
        this.props.triggerMenuCollapse();
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[this.state.current]}>
                <Menu.Item key={ROUTE_HOME}>
                    <Tooltip placement="right">
                        <Link to={ROUTE_HOME}>
                            <Icon type="home"/>
                            <span className="nav-text">{i18n.t('sideMenu.home')}</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );
    }
}
