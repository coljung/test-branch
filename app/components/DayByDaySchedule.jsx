import React, { Component } from 'react';
import { Row, Col, Button, Icon, DatePicker, TimePicker, notification, Switch } from 'antd';
import { range, omit } from 'lodash';
import moment from 'moment';
import DateHelper from '../helpers/DateHelper';

export default class DayByDaySchedule extends Component {

    defaultTimeFrom = '10:00';
    defaultTimeTo = '18:00';

    constructor(props) {
        super(props);
        this.state = {
            pastSchedule: props.schedule.filter(this.isPastSchedule),
            schedule: this.buildInternalSchedule(props.schedule),
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            pastSchedule: props.schedule.filter(this.isPastSchedule),
            schedule: this.buildInternalSchedule(props.schedule, this.state.schedule),
        });
    }

    buildInternalSchedule(remoteSchedule, currentSchedule = []) {
        const internalSchedule = [].concat(currentSchedule.filter(s => !this.isPastSchedule(s)));

        remoteSchedule.forEach((remote) => {
            const internal = internalSchedule.find(s => s.date === remote.date || remote.date === null);
            if (!internal && !this.isPastSchedule(remote)) {
                internalSchedule.push({
                    date: remote.date,
                    from: remote.from,
                    to: remote.to,
                    isFullDay: this.isFullDay(remote.from, remote.to),
                    unavailability: remote.unavailability || [],
                });
            }
        });
        return internalSchedule;
    }

    isPastSchedule(schedule) {
        return moment().isAfter(schedule.date, 'day');
    }

    buildRemoteSchedule(internalSchedule) {
        this.state.pastSchedule.forEach((remote) => {
            const index = internalSchedule.findIndex(s => s.date === remote.date);
            if (index < 0) {
                // adding back the past days in the the remote entity
                internalSchedule.unshift({
                    date: remote.date,
                    from: remote.from,
                    to: remote.to,
                    unavailability: this.filterUnavailability(remote.unavailability),
                });
            }
        });

        return internalSchedule.filter(p => p.date !== null && p.from && p.to)
            .map(p => omit(p, ['_id', 'isFullDay']));
    }

    filterUnavailability(unavailability) {
        if (!unavailability) {
            return [];
        }
        return unavailability.filter(p => p.from && p.to)
            .map(p => omit(p, ['_id']));
    }

    disablePastDays(current) {
        return current && current.isBefore(moment(), 'day');
    }

    isFullDay(from, to) {
        const start = moment(from, 'HH:mm');
        const end = moment(to, 'HH:mm');
        const minutes = end.diff(start, 'minutes');
        // full day around 1440 minutes, assuming anything above 1400 to be full day
        return minutes > 1400;
    }

    onDateChange(index, date, dateFormatted) {
        const schedule = [].concat(this.state.schedule);
        dateFormatted = moment(dateFormatted, this.props.datePickerFormat).format(this.props.scheduleFormat);
        if (date) {
            if (schedule.filter(e => e.date === dateFormatted).length) {
                notification.warning({
                    message: 'Warning',
                    description: 'A schedule already exists for this day.',
                });
                schedule[index].date = null;
            } else {
                schedule[index].date = dateFormatted;
            }
        } else {
            schedule[index].date = null;
        }
        this.setState({ schedule });
        this.onChange(schedule);
    }

    onTimeChange(index, type, time) {
        const schedule = [].concat(this.state.schedule);
        schedule[index][type] = time ? time.format('HH:mm') : null;
        // @todo figure out if it's a good practice to use callback on setState
        this.setState({ schedule }, () => {
            this.onChange(schedule);
        });
    }

    addEntry() {
        const schedule = [].concat(this.state.schedule);
        schedule.push({
            date: null,
            from: this.props.enableFullDaySwitch ? '00:00' : this.defaultTimeFrom,
            to: this.props.enableFullDaySwitch ? '23:59' : this.defaultTimeTo,
            isFullDay: this.props.enableFullDaySwitch,
        });

        this.setState({ schedule }, () => {
            this.onChange(schedule);
        });
    }

    deleteEntry(index) {
        const schedule = [].concat(this.state.schedule);
        schedule.splice(index, 1);
        this.setState({ schedule }, () => {
            this.onChange(schedule);
        });
    }

    addUnavailability(index) {
        const schedule = [].concat(this.state.schedule);
        if (schedule[index].unavailability === undefined) {
            schedule[index].unavailability = [];
        }
        schedule[index].unavailability.push({
            from: null,
            to: null,
        });

        this.setState({ schedule });
    }

    deleteUnavailability(index, unavIndex) {
        const schedule = [].concat(this.state.schedule);
        schedule[index].unavailability.splice(unavIndex, 1);
        this.setState({ schedule }, () => {
            this.onChange(schedule);
        });
    }

    onUnavailabilityTimeChange(index, unavIndex, type, time) {
        const schedule = [].concat(this.state.schedule);
        schedule[index].unavailability[unavIndex][type] = time.format('HH:mm');
        this.setState({ schedule }, () => {
            this.onChange(schedule);
        });
    }

    onChange(schedule) {
        this.props.onChange(this.buildRemoteSchedule(schedule));
    }

    renderUnavailability(unav, index, unavIndex) {
        return (
            <Row key={`unav-${index}-${unavIndex}`}>
                <Col offset={2} xs={3} md={2} className={'timelabel'}>From:</Col>
                <Col xs={4} md={3}>
                    <TimePicker
                        className="unavailability-from-time-picker"
                        placeholder="From"
                        size="large"
                        format="HH:mm"
                        defaultValue={unav.from ? moment(unav.from, 'HH:mm') : null}
                        onChange={this.onUnavailabilityTimeChange.bind(this, index, unavIndex, 'from')}
                        disabledMinutes={DateHelper.disableMinutes}
                        hideDisabledOptions
                    />
                </Col>
                <Col xs={3} md={2} className={'timelabel'}>To:</Col>
                <Col xs={4} md={3}>
                    <TimePicker
                        className="unavailability-to-time-picker"
                        placeholder="To"
                        size="large"
                        format="HH:mm"
                        defaultValue={unav.to ? moment(unav.to, 'HH:mm') : null}
                        onChange={this.onUnavailabilityTimeChange.bind(this, index, unavIndex, 'to')}
                        disabledMinutes={DateHelper.disableMinutes}
                        hideDisabledOptions
                    />
                </Col>
                <Col offset={1} xs={3} md={3}>
                    <Button type="danger" className="ant-btn-md" onClick={this.deleteUnavailability.bind(this, index, unavIndex)}>
                        <Icon type="delete" /> Delete break
                    </Button>
                </Col>
            </Row>
        );
    }

    updateFullDaySwitch(index, value) {
        const schedule = [].concat(this.state.schedule);
        if (value) {
            schedule[index].from = '00:00';
            schedule[index].to = '23:59';
            schedule[index].isFullDay = true;
        } else {
            schedule[index].from = this.defaultTimeFrom;
            schedule[index].to = this.defaultTimeTo;
            schedule[index].isFullDay = false;
        }
        this.setState({ schedule });
        this.onChange(schedule);
    }

    renderEntry(entry, index) {
        let breakIndex = 0;
        return (
            <div className={'dayschedule'} key={`schedule-${index}`}>
                <Row>
                    <Col md={8} lg={7}>
                        <DatePicker
                            placeholder="Date"
                            size="large"
                            style={this.props.datePickerStyle}
                            format={this.props.datePickerFormat}
                            value={entry.date ? moment(entry.date, this.props.scheduleFormat) : null}
                            defaultValue={entry.date ? moment(entry.date, this.props.scheduleFormat) : null}
                            onChange={this.onDateChange.bind(this, index)}
                            disabledMinutes={DateHelper.disableMinutes}
                            disabledDate={this.disablePastDays}
                            hideDisabledOptions
                        />
                        { this.props.enableFullDaySwitch ? (
                            <Switch
                                checkedChildren="Full Day"
                                unCheckedChildren="Full Day"
                                defaultChecked={entry.isFullDay}
                                style={{ marginLeft: '20px' }}
                                onChange={this.updateFullDaySwitch.bind(this, index)} />
                        ) : null }
                    </Col>
                    <Col md={10} lg={8} style={{ visibility: this.props.enableFullDaySwitch && entry.isFullDay ? 'hidden' : '' }}>
                        <span className={'timelabel'}>From: </span>
                        <TimePicker
                            placeholder="From"
                            size="large"
                            format="HH:mm"
                            value={moment(this.state.schedule[index].from, 'HH:mm')}
                            defaultValue={entry.from ? moment(entry.from, 'HH:mm') : null}
                            onChange={this.onTimeChange.bind(this, index, 'from')}
                            disabledMinutes={DateHelper.disableMinutes}
                            disabled={this.props.enableFullDaySwitch && entry.isFullDay}
                            hideDisabledOptions
                        />
                        <span className={'timelabel'}>To: </span>
                        <TimePicker
                            placeholder="To"
                            size="large"
                            format="HH:mm"
                            value={moment(this.state.schedule[index].to, 'HH:mm')}
                            defaultValue={entry.to ? moment(entry.to, 'HH:mm') : null}
                            onChange={this.onTimeChange.bind(this, index, 'to')}
                            disabledMinutes={DateHelper.disableMinutes}
                            disabled={this.props.enableFullDaySwitch && entry.isFullDay}
                            hideDisabledOptions
                        />
                    </Col>
                    <Col xs={3} md={2}>
                        <Button type="danger" className="ant-btn-md" onClick={this.deleteEntry.bind(this, index)}>
                            <Icon type="delete" /> Remove
                        </Button>
                    </Col>
                </Row>
                { this.props.showUnavailability ? (
                    <Row>
                        <Col offset={1} xs={3} md={3}>
                            <label>Breaks</label>
                        </Col>
                    </Row>
                ) : null }
                { this.props.showUnavailability && entry.unavailability && (
                    entry.unavailability.map((unav) => {
                        const result = this.renderUnavailability(unav, index, breakIndex);
                        breakIndex += 1;
                        return result;
                    })
                )}
                { this.props.showUnavailability ? (
                    <Row>
                        <Col offset={1} xs={23}>
                            <Button type="primary" className="ant-btn-md" onClick={this.addUnavailability.bind(this, index)}>
                                <Icon type="plus-circle-o" /> Add a break
                            </Button>
                        </Col>
                    </Row>
                ) : null}
                <Row>&nbsp;</Row>
            </div>
        );
    }

    render() {
        let index = 0;
        return (
            <div>
                {this.state && this.state.schedule && (
                    this.state.schedule.map((entry) => {
                        const result = this.renderEntry(entry, index);
                        index += 1;
                        return result;
                    })
                )}
                <Button type="primary" className="ant-btn-md" onClick={this.addEntry.bind(this)}>
                    <Icon type="plus-circle-o" /> Add schedule for a day
                </Button>
            </div>
        );
    }
}

DayByDaySchedule.propTypes = {
    schedule: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    showUnavailability: React.PropTypes.bool,
    enableFullDaySwitch: React.PropTypes.bool,
    datePickerFormat: React.PropTypes.string,
    scheduleFormat: React.PropTypes.string,
    datePickerStyle: React.PropTypes.object,
};

DayByDaySchedule.defaultProps = {
    showUnavailability: true,
    enableFullDaySwitch: false,
    datePickerFormat: 'YYYY-MM-DD',
    scheduleFormat: 'YYYY-MM-DD',
    datePickerStyle: {},
};
