import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Board from './Board.jsx';

export default class Dashboard extends Component {
    render() {
        return (
            <Row>
                <Col sm={12} md={3} lg={3}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={9} lg={9}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={8} lg={8}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={4} lg={4}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={4} lg={4}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={8} lg={8}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={8} lg={8}><Board>Main Dashboard</Board></Col>
                <Col sm={12} md={4} lg={4}><Board>Main Dashboard</Board></Col>
            </Row> 
        );
    }
}