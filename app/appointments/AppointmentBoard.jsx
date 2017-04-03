import React, { Component } from 'react';
import { Button, Icon, Tabs } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAppointments } from './AppointmentActions';
import { getStylists } from '../stylists/StylistActions';
import moment from 'moment';
import Board from '../components/Board';
import AppointmentList from './AppointmentList';
import AppointmentCalendar from './AppointmentCalendar';
import { ROUTE_APPOINTMENTS_LIST } from '../Routes';

const TabPane = Tabs.TabPane;
export const LIST_TAB = '1';
export const CALENDAR_TAB = '2';

export class AppointmentBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list_parameters: {
                date_from: moment(),
            },
            calendar_parameters: {
                date: moment(),
            },
        };
    }

    componentDidMount() {
        // Get all stylists without pagination
        this.props.getStylists(this.props.currentStoreId, -1);
        this.loadAppointments(this.state.list_parameters);
    }

    loadListAppointments(params) {
        this.state.list_parameters = params;
        this.loadAppointments(params);
    }

    loadCalendarAppointments(params) {
        this.state.calendar_parameters = params;
        params.page = -1;
        // @todo params filter needs to be improved by default does not select current month precisely
        this.loadAppointments(params);
    }

    loadAppointments(params) {
        const filter = {
            store_id: this.props.currentStoreId,
            page: params.page || 1,
        };

        if (params.date) {
            filter.date_from = params.date.clone().startOf('month').subtract(15, 'days').format('YYYY-MM-DD');
            filter.date_to = params.date.clone().endOf('month').add(15, 'days').format('YYYY-MM-DD');
        } else {
            if (params.date_from) {
                filter.date_from = params.date_from.format('YYYY-MM-DD');
            }
            if (params.date_to) {
                filter.date_to = params.date_to.format('YYYY-MM-DD');
            }
        }

        if (params.type) {
            filter.type = params.type;
        }

        if (params.stylist_id) {
            filter.stylist_id = params.stylist_id;
        }

        this.props.getAppointments(filter);
    }

    onTabChange(tab) {
        if (tab === LIST_TAB) {
            this.loadListAppointments(this.state.list_parameters);
        }
        if (tab === CALENDAR_TAB) {
            this.loadCalendarAppointments(this.state.calendar_parameters);
        }
    }

    render() {
        const btnNew = (
            <Link to={`${ROUTE_APPOINTMENTS_LIST}/new`}>
                <Button type="primary" className="ant-btn-xl">
                    <Icon type="plus-circle-o"/> Create new Appointment
                </Button>
            </Link>);

        return (
            <Board title="Appointments" btnInTitle={btnNew}>
                <Tabs defaultActiveKey={LIST_TAB} onChange={this.onTabChange.bind(this)}>
                    <TabPane tab="Appointments list" key={LIST_TAB}>
                        <AppointmentList
                            stylists={this.props.stylists}
                            appointments={this.props.appointments}
                            pagination={this.props.pagination}
                            filters={this.state.list_parameters}
                            onChange={this.loadListAppointments.bind(this)}/>
                    </TabPane>

                    <TabPane tab="Appointments calendar" key={CALENDAR_TAB}>
                        <AppointmentCalendar
                            stylists={this.props.stylists}
                            appointments={this.props.appointments}
                            pagination={this.props.pagination}
                            filters={this.state.calendar_parameters}
                            onChange={this.loadCalendarAppointments.bind(this)}/>
                    </TabPane>
                </Tabs>
            </Board>
        );
    }
}

function mapStateToProps(state) {
    return {
        appointments: state.AppointmentReducer.appointments.collection || [],
        stylists: state.StylistReducer.stylists.collection || [],
        pagination: state.AppointmentReducer.appointments.meta,
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAppointments, getStylists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentBoard);
