import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Board from './Board.jsx';

export default class Dashboard extends Component {
    render() {
        return (
            <Row>
                <Col sm={12} md={4} lg={4}><Board>Secondary Dashboard</Board></Col>
                <Col sm={12} md={8} lg={8}><Board>Secondary Dashboard</Board></Col>
                <Col sm={12} md={6} lg={6}><Board>Secondary Dashboard</Board></Col>
                <Col sm={12} md={6} lg={6}><Board>Secondary Dashboard</Board></Col>
                <Col sm={12} md={8} lg={8}><Board>Secondary Dashboard</Board></Col>
                <Col sm={12} md={4} lg={4}><Board>Secondary Dashboard</Board></Col>
                <Col sm={12} md={12} lg={12}><Board>Secondary Dashboard</Board></Col>
            </Row> 
        );
    }
}