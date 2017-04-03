import React, { Component } from 'react';
import { Row, Col, Switch, TimePicker } from 'antd';
import { pick, range, upperFirst } from 'lodash';
import moment from 'moment';
import DateHelper from '../helpers/DateHelper';

export default class WeeklySchedule extends Component {

    constructor(props) {
        super();
        this.daysOfWeek = DateHelper.getDaysOfWeek();
        this.defaultFromTime = '10:00';
        this.defaultToTime = '18:00';
        this.state = { schedule: this.buildSchedule(props.schedule) };
    }

    componentWillReceiveProps(props) {
        this.setState({ schedule: this.buildSchedule(props.schedule) });
    }

    buildSchedule(schedule) {
        const builtSchedule = {};

        this.daysOfWeek.forEach((day) => {
            if (schedule[day] !== undefined && schedule[day] !== null) {
                builtSchedule[day] = schedule[day];
            }
        });

        return builtSchedule;
    }

    onTimeChange(day, type, time) {
        const schedule = Object.assign({}, this.state.schedule);
        schedule[day][type] = time.format('HH:mm');
        this.setState({ schedule });
        this.props.onChange(this.buildSchedule(schedule));
    }

    enableDay(day, b) {
        const schedule = Object.assign({}, this.state.schedule);
        if (b) {
            schedule[day] = { from: this.defaultFromTime, to: this.defaultToTime };
        } else {
            schedule[day] = null;
        }
        this.setState({ schedule });
        this.props.onChange(this.buildSchedule(schedule));
    }

    renderForDay(day) {
        return (
            <div className={'dayschedule'} key={`schedule-${day}`}>
                <Row>
                    <Col md={8} lg={7} className={'timedayswitch'}>
                        <Col span={14} className='day-label'>{upperFirst(day)}</Col>
                        <Col span={10}>
                            <Switch
                                checked={this.state && this.state.schedule[day] !== undefined && this.state.schedule[day] != null}
                                onChange={this.enableDay.bind(this, day)}
                                checkedChildren="Open  "
                                unCheckedChildren="Closed"
                            />
                        </Col>
                    </Col>
                    <Col span={16}>
                        {this.state && this.state.schedule[day] !== undefined && this.state.schedule[day] != null && (
                            <Col md={16}>
                                <span className={'timelabel'}>From: </span>
                                <TimePicker
                                    placeholder="From"
                                    size="large"
                                    format="HH:mm"
                                    defaultValue={moment(this.state.schedule[day].from, 'HH:mm')}
                                    onChange={this.onTimeChange.bind(this, day, 'from')}
                                    disabledMinutes={DateHelper.disableMinutes}
                                    hideDisabledOptions
                                />
                                <span className={'timelabel'}>To: </span>
                                <TimePicker
                                    placeholder="To"
                                    size="large"
                                    format="HH:mm"
                                    defaultValue={moment(this.state.schedule[day].to, 'HH:mm')}
                                    onChange={this.onTimeChange.bind(this, day, 'to')}
                                    disabledMinutes={DateHelper.disableMinutes}
                                    hideDisabledOptions
                                />
                            </Col>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.daysOfWeek.map(day => this.renderForDay(day))}
            </div>
        );
    }
}

WeeklySchedule.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    schedule: React.PropTypes.object.isRequired,
};
