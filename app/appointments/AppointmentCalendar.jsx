import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Calendar } from 'antd';
import moment from 'moment';
import { ROUTE_APPOINTMENTS_LIST } from '../Routes';

export default class AppointmentCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = { filters: props.filters };
    }

    componentWillReceiveProps(props) {
        this.setState({ filters: props.filters });
    }

    dateCellRender(date) {
        const dayFormatted = date.format('YYYY-MM-DD');
        const dayAppointments = this.props.appointments.filter(a => a.start_at.substr(0, 10) === dayFormatted);
        if (dayAppointments.length) {
            return (
                <ul className="appointments">
                    {dayAppointments.map(a =>
                        (
                            <li key={a.id}>
                                <span>●</span>
                                <Link onClick={browserHistory.push.bind(this, `${ROUTE_APPOINTMENTS_LIST}/${a.id}`)} target="_blank">
                                    {moment(a.start_at).utcOffset(0).format('HH:mm')} to {moment(a.start_at).utcOffset(0).add(a.duration, 'minutes').format('HH:mm')}
                                </Link>
                            </li>
                        ),
                    )}
                </ul>
            );
        }

        return null;
    }

    onDateRangeChange(date) {
        this.state.filters.date = date;
        this.props.onChange(this.state.filters);
    }

    render() {
        return (
            <Calendar
                onPanelChange={this.onDateRangeChange.bind(this)}
                dateCellRender={this.dateCellRender.bind(this)}/>
        );
    }
}

AppointmentCalendar.propTypes = {
    appointments: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onChange: React.PropTypes.func.isRequired,
};
