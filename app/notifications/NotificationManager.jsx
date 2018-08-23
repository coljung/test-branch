import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NotificationManager extends Component {
    static propTypes = {
        message: PropTypes.object,
        clearMessages: PropTypes.func,
    };

    componentWillReceiveProps(props) {
        if (props.message) {
            setTimeout(this.props.clearMessages, 7000);
            // message[props.message.messageType](props.message.content, 5);
        }
    }

    render() {
        return (<div></div>);
    }
}
