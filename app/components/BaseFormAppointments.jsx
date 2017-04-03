import React from 'react';
import { Button, Form, Row, Col, Icon } from 'antd';
import NotificationManager from '../notifications/NotificationManager';

export default class BaseFormAppointments extends React.Component {
    render() {
        let deleteButton = null;
        if (this.props.onDeleteClick) {
            deleteButton = (
                <Button onClick={this.props.onDeleteClick}
                        type="danger"
                        className="ant-btn-xl"
                        style={{ marginRight: 10 }}>Delete</Button>
            );
        }

        return (
            <div>
                <h2>{this.props.title}</h2>
                <Form>
                    {this.props.children}

                    <Row className="formButtonBox">
                        <Col span={12}>
                            <Button onClick={this.props.onSaveClick}
                                    type="primary"
                                    className="ant-btn-xl"
                                    disabled={ this.props.hasErrors ? this.props.hasErrors() : false }
                                    style={ { marginRight: 10 } }>Save</Button>

                            {deleteButton}

                            <Button
                                onClick={this.props.onCancelClick}
                                className="ant-btn-xl">
                                <Icon type="arrow-left" /> Go Back
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <NotificationManager />
            </div>
        );
    }
}

BaseFormAppointments.propTypes = {
    onSaveClick: React.PropTypes.func.isRequired,
    onCancelClick: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element,
    ]).isRequired,
    onDeleteClick: React.PropTypes.func,
};
