import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import NavigationUser from './NavigationUser';


export default class HeaderContent extends Component {
    render() {
        return (
            <div className="headerContent">
                <Logo />
                <h1>Store Management</h1>
                <NavigationUser onStoreBtnClick={this.props.onStoreSelectClick} />
            </div>
        );
    }
}

HeaderContent.propTypes = {
    onStoreSelectClick: React.PropTypes.func.isRequired,
};
