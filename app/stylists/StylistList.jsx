import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStylists, deleteStylist } from './StylistActions';
import { ROUTE_STYLISTS_LIST } from '../Routes';
import { TAB_APPOINTMENTS_CALENDAR, TAB_STYLIST_AVAILABILITY } from './StylistForm';
import { Button, Table, Popconfirm } from 'antd';
import Board from '../components/Board';
import LinkedButton from '../components/LinkedButton';

export class StylistList extends Component {

    componentWillReceiveProps(props) {
        if (props.currentStoreId !== this.props.currentStoreId) {
            this.props.getStylists(props.currentStoreId);
        }
    }

    componentDidMount() {
        this.props.getStylists(this.props.currentStoreId);
    }

    buildColumns() {
        return [
            {
                title: 'Stylist name',
                key: 'name',
                dataIndex: 'name',
                sorter: (a, b) => a.first_name + a.last_name < b.first_name + b.last_name,
                render: (text, record) => `${record.first_name} ${record.last_name}`,
            },
            {
                title: 'Actions',
                key: 'action',
                render: record => (
                    <div>
                        <Button.Group style={{ marginRight: 10 }}>
                            <LinkedButton to={`${ROUTE_STYLISTS_LIST}/${record.id}`}
                                          size='large'
                                          icon='edit'>Edit</LinkedButton>
                            <LinkedButton to={`${ROUTE_STYLISTS_LIST}/${record.id}/tab/${TAB_STYLIST_AVAILABILITY}`}
                                          size='large'
                                          icon='bars'>Availabilities</LinkedButton>
                            <LinkedButton to={`${ROUTE_STYLISTS_LIST}/${record.id}/tab/${TAB_APPOINTMENTS_CALENDAR}`}
                                          size='large'
                                          icon='calendar'>Appointments</LinkedButton>
                        </Button.Group>
                        <Popconfirm
                            title='Are you sure you want to delete this stylist?'
                            onConfirm={this.props.deleteStylist.bind(this, record.id)}>
                            <Button icon='delete' size='large' type='danger'>Delete</Button>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
    }

    buildPagination() {
        return {
            total: this.props.pagination.total,
            pageSize: this.props.pagination.per_page,
            onChange: (current) => {
                this.props.getStylists(this.props.currentStoreId, current);
            },
        };
    }

    render() {
        const btn = <LinkedButton to={`${ROUTE_STYLISTS_LIST}/new`}
                                  type='primary'
                                  className='ant-btn-xl'
                                  icon='plus-circle-o'>Create new Stylist</LinkedButton>;

        return (
            <Board title='Stylists' btnInTitle={btn}>
                <Table rowKey={record => record.id}
                       columns={this.buildColumns()}
                       dataSource={this.props.stylists}
                       size='middle'
                       locale={{ emptyText: 'No Stylists Found' }}
                       pagination={this.buildPagination()} />
            </Board>
        );
    }
}

function mapStateToProps(state) {
    return {
        stylists: state.StylistReducer.stylists.collection || [],
        pagination: state.StylistReducer.stylists.meta || { total: 0, per_page: 20 },
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStylists, deleteStylist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StylistList);
