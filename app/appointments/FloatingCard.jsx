import React, { Component } from 'react';
import { Affix, Card, Row, Col } from 'antd';

export default class FloatingCard extends Component {

    render() {
        return (
            <Affix className="app-floater" offsetTop={70}>
                <Card title="Appointment Details" style={{ width: 300 }}>
                    <Row>
                        <Col span={8}>
                            <strong>Customer Info:</strong>
                        </Col>
                        <Col span={16}>
                            {this.props.customerEmail}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <strong>Type:</strong>
                        </Col>
                        <Col span={16}>
                            {this.props.type}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <strong>Fitting Room:</strong>
                        </Col>
                        <Col span={16}>
                            {this.props.fittingRoom}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <strong>Duration:</strong>
                        </Col>
                        <Col span={16}>
                            {this.props.duration}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <strong>Stylist:</strong>
                        </Col>
                        <Col span={16}>
                            {this.props.stylist}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <strong>Start at:</strong>
                        </Col>
                        <Col span={16}>
                            {this.props.startAt}
                        </Col>
                    </Row>
                </Card>
            </Affix>
        );
    }
}

FloatingCard.propTypes = {
    customerEmail: React.PropTypes.string,
    type: React.PropTypes.string,
    fittingRoom: React.PropTypes.string,
    duration: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    stylist: React.PropTypes.string,
    startAt: React.PropTypes.string,
};
