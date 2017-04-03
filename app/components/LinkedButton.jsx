import React, { Component } from 'react';
import { Button } from 'antd';
import { browserHistory } from 'react-router';

export default class LinkedButton extends Component {
    navigate(to) {
        browserHistory.push(to);
    }

    render() {
        return (
            <Button onClick={this.navigate.bind(this, this.props.to)} {...this.props}>{this.props.children}</Button>
        );
    }
}

LinkedButton.propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]).isRequired,
};
