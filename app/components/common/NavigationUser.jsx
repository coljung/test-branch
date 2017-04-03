import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Menu, Icon, Button } from 'antd';
import { resetCurrentStore, getStores, setStoreFromStorage } from '../../stores/StoreActions';

const SubMenu = Menu.SubMenu;

export class NavigationUser extends Component {
    constructor(props) {
        super(props);

        // only fetch the first time if there are no stores
        if (!props.fetchReady && props.stores.length === 0) {
            props.getStores(-1);
        }
        this.state = { current: 'setting:1' };
    }

    getStoreSelectValue() {
        if (this.props.currentStore) {
            return this.props.currentStore.name;
        }
        return this.props.stores && this.props.stores.length > 0 ? 'Select a store' : 'No store';
    }

    handleClick(e) {}

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal">

                <SubMenu title={<span>{this.getStoreSelectValue()} <Icon type="down" /></span>}>
                    <Menu.Item>
                        <Button
                            className="change-store-button"
                            type="primary"
                            onClick={this.props.onStoreBtnClick}>
                            <Icon type="retweet"/> Change Store
                        </Button>
                    </Menu.Item>
                </SubMenu>
                <SubMenu title={<span>User Name <Icon type="setting" /></span>}>
                    <Menu.Item>
                        <Link to="/logout">
                            <Icon type="logout" />Log out
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

NavigationUser.propTypes = {
    onStoreBtnClick: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        currentStore: state.StoreReducer.currentStore,
        stores: state.StoreReducer.stores.collection || [],
        fetchReady: state.StoreReducer.fetchReady,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ resetCurrentStore, getStores, setStoreFromStorage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationUser);
