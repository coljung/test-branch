import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStores } from './StoreActions';
import { browserHistory } from 'react-router';
import { ROUTE_STORE_LIST } from '../Routes';
import { TAB_EXTENDED_HOURS, TAB_HOLIDAYS, TAB_WEEKLY_SCHEDULE } from './StoreForm';
import { Button, Table, Tooltip, Popover } from 'antd';
import Board from '../components/Board';
import LinkedButton from '../components/LinkedButton';

export class StoreList extends Component {

    componentDidMount() {
        this.props.getStores();
    }

    buildColumns() {
        return [
            {
                title: 'Store name',
                key: 'name',
                dataIndex: 'name',
                sorter: (a, b) => a.name < b.name,
            },
            {
                title: 'Weekly Schedule',
                key: 'schedule',
                dataIndex: 'schedule',
                render: schedule => this.renderWeekDays(schedule),
            },
            {
                title: 'Actions',
                key: 'action',
                render: record => (
                    // @todo calendar should be schedule, picture should be gift (this icons don't work on mac)
                    <Button.Group>
                        <LinkedButton to={`${ROUTE_STORE_LIST}/${record.id}`}
                                      size='large'
                                      icon='edit'>Edit</LinkedButton>
                        <Tooltip title='Manage Weekly Schedule'
                                 onClick={browserHistory.push.bind(this, `${ROUTE_STORE_LIST}/${record.id}/tab/${TAB_WEEKLY_SCHEDULE}`)}>
                            <Button size='large'
                                    className='largeIconButton'
                                    icon='calendar'/>
                        </Tooltip>
                        <Tooltip title='Manage Holidays'
                                 onClick={browserHistory.push.bind(this, `${ROUTE_STORE_LIST}/${record.id}/tab/${TAB_HOLIDAYS}`)}>
                            <Button size='large'
                                      className='largeIconButton'
                                      icon='picture'/>
                        </Tooltip>
                        <Tooltip title='Manage Extended Hours'
                                 onClick={browserHistory.push.bind(this, `${ROUTE_STORE_LIST}/${record.id}/tab/${TAB_EXTENDED_HOURS}`)}>
                            <Button size='large'
                                    className='largeIconButton'
                                    icon='clock-circle-o'/>
                        </Tooltip>
                    </Button.Group>
                ),
            },
        ];
    }

    buildPagination() {
        return {
            total: this.props.pagination.total,
            pageSize: this.props.pagination.per_page,
            onChange: (current) => {
                this.props.getStores(current);
            },
        };
    }

    renderWeekDays(schedule) {
        delete schedule.unavailability;
        delete schedule.custom_schedule;

        // Filter out any possible null days of the week
        Object.keys(schedule).forEach(key => (schedule[key] === null) && delete schedule[key]);

        return Object.keys(schedule).map((day, i) =>
            <Popover key={day}
                     title={`${day[0].toUpperCase()}${day.slice(1)}`}
                     content={`${schedule[day].from} to ${schedule[day].to}`}>
                {day[0].toUpperCase()}{day[1]}{day[2]}{i === Object.keys(schedule).length - 1 ? '' : ', '}
            </Popover>,
        );
    }

    render() {
        const btn = <LinkedButton to={`${ROUTE_STORE_LIST}/new`}
                                  type='primary'
                                  className='ant-btn-xl'
                                  icon='plus-circle-o'>Create new Store</LinkedButton>;

        return (
            <Board title='Stores' btnInTitle={btn}>
                <Table rowKey={record => record.id}
                       columns={this.buildColumns()}
                       dataSource={this.props.stores}
                       size='middle'
                       locale={{ emptyText: 'No Stores Found' }}
                       pagination={this.buildPagination()} />
            </Board>
        );
    }
}

function mapStateToProps(state) {
    return {
        stores: state.StoreReducer.stores.collection || [],
        pagination: state.StoreReducer.stores.meta || { total: 0, per_page: 20 },
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStores }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
