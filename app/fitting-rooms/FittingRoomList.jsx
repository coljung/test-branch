import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFittingRooms, deleteFittingRoom } from './FittingRoomActions';
import { ROUTE_FITTING_ROOM_LIST } from '../Routes';
import { Button, Table, Popconfirm } from 'antd';
import Board from '../components/Board';
import LinkedButton from '../components/LinkedButton';

export class FittingRoomList extends Component {

    componentWillReceiveProps(props) {
        if (props.currentStoreId !== this.props.currentStoreId) {
            this.props.getFittingRooms(props.currentStoreId);
        }
    }

    componentDidMount() {
        this.props.getFittingRooms(this.props.currentStoreId);
    }

    buildColumns() {
        return [
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                sorter: (a, b) => a.name < b.name,
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <LinkedButton to={`${ROUTE_FITTING_ROOM_LIST}/${text.id}`}
                                      size='large'
                                      icon='edit'
                                      style={{ marginRight:10 }}>Edit</LinkedButton>
                        <Popconfirm
                            title='Are you sure you want to delete this fitting room?'
                            onConfirm={this.deleteOne.bind(this, text.id)}>
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
                this.props.getFittingRooms(this.props.currentStoreId, current);
            },
        };
    }

    deleteOne(id) {
        this.props.deleteFittingRoom(id);
    }

    render() {
        const btn = <LinkedButton
            to={`${ROUTE_FITTING_ROOM_LIST}/new`}
            type='primary'
            className='ant-btn-xl'
            icon='plus-circle-o'>Create new Fitting Room</LinkedButton>;

        return (
            <Board title='Fitting Rooms' btnInTitle={btn}>
                <Table rowKey={record => record.id}
                       columns={this.buildColumns()}
                       dataSource={this.props.fittingRooms}
                       size='middle'
                       locale={{ emptyText: 'No Fitting Rooms Found' }}
                       pagination={this.buildPagination()} />
            </Board>
        );
    }
}

function mapStateToProps(state) {
    return {
        fittingRooms: state.FittingRoomReducer.fittingRooms.collection || [],
        pagination: state.FittingRoomReducer.fittingRooms.meta || { total: 0, per_page: 20 },
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFittingRooms, deleteFittingRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FittingRoomList);
