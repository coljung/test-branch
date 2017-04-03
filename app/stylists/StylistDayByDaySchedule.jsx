import React, { Component } from 'react';
import { Row, Col, Button, Icon, DatePicker, TimePicker, Switch } from 'antd';
import { range, omit } from 'lodash';
import moment from 'moment';
import DateHelper from '../helpers/DateHelper';

class StylistDayByDaySchedule extends Component {

    defaultFromTime = '10:00';
    defaultToTime = '18:00';
    defaultBreakFromTime = '13:00';
    defaultBreakToTime = '14:00';

    constructor(props) {
        super();
        this.state = {
            schedule: props.schedule,
            preFilledSchedule: [],
        };
        this.state.preFilledSchedule = this.generatePreFilledSchedule(props.schedule);
    }

    componentWillReceiveProps(props) {
        if (props.schedule && props.schedule.length > 0) {
            this.setState({
                schedule: props.schedule,
                preFilledSchedule: this.generatePreFilledSchedule(props.schedule),
            });
        }
    }

    generatePreFilledSchedule(originalSchedule) {
        originalSchedule = originalSchedule || [];
        const days = 20;
        const preFilledSchedule = [].concat(this.state.preFilledSchedule);
        for (let i = 0; i < days; i++) {
            const date = moment().add({ day: (i + 1) }).format('YYYY-MM-DD');
            const origin = originalSchedule.find(element => (element.date === date));
            const schedule = {
                date: origin ? origin.date : date,
                from: origin ? origin.from : this.defaultFromTime,
                to: origin ? origin.to : this.defaultToTime,
                unavailability: origin ? origin.unavailability : [],
                disabled: !(origin !== undefined),
                isModified: false,
            };
            if (!preFilledSchedule[i]) {
                preFilledSchedule.push(schedule);
            } else if (!preFilledSchedule[i].isModified) {
                preFilledSchedule[i] = schedule;
            }
        }
        return preFilledSchedule;
    }

    getSchedule(preFilledSchedule) {
        const schedule = this.state.schedule.slice();
        preFilledSchedule.forEach((s) => {
            const index = schedule.findIndex(element => element.date === s.date);
            // when a date is disabled we remove it from the original schedule
            if (s.disabled) {
                if (index > -1) {
                    schedule.splice(index, 1);
                }
                return;
            }
            // when a date is enabled we add it to the original schedule
            const t = {
                date: s.date,
                from: s.from,
                to: s.to,
                unavailability: s.unavailability,
            };
            // filters break time
            t.unavailability = s.unavailability
                .filter(p => p.from && p.to)
                .map(p => omit(p, ['_id']));

            if (index > -1) {
                schedule[index] = t;
            } else {
                schedule.push(t);
            }
        });
        // filters schedule
        return schedule
            .filter(p => p.date !== null && p.from && p.to)
            .map(p => omit(p, ['_id']));
    }

    onTimeChange(index, type, time) {
        const preFilledSchedule = [].concat(this.state.preFilledSchedule);
        preFilledSchedule[index].isModified = true;
        preFilledSchedule[index][type] = time ? time.format('HH:mm') : null;
        const schedule = this.getSchedule(preFilledSchedule);
        this.setState({ preFilledSchedule, schedule });
        this.props.onChange(schedule);
    }

    onDateDisableChange(index) {
        const preFilledSchedule = [].concat(this.state.preFilledSchedule);
        preFilledSchedule[index].isModified = true;
        preFilledSchedule[index].disabled = !preFilledSchedule[index].disabled;

        if (preFilledSchedule[index].disabled) {
            preFilledSchedule[index].from = this.defaultFromTime;
            preFilledSchedule[index].to = this.defaultToTime;
        }

        const schedule = this.getSchedule(preFilledSchedule);
        this.setState({ preFilledSchedule, schedule });
        this.props.onChange(schedule);
    }

    addUnavailability(index) {
        const preFilledSchedule = [].concat(this.state.preFilledSchedule);
        preFilledSchedule[index].isModified = true;
        preFilledSchedule[index].unavailability.push({
            from: this.defaultBreakFromTime,
            to: this.defaultBreakToTime,
        });

        const schedule = this.getSchedule(preFilledSchedule);
        this.setState({ preFilledSchedule, schedule });
        this.props.onChange(schedule);
    }

    deleteUnavailability(index, unavIndex) {
        const preFilledSchedule = [].concat(this.state.preFilledSchedule);
        preFilledSchedule[index].isModified = true;
        preFilledSchedule[index].unavailability.splice(unavIndex, 1);
        const schedule = this.getSchedule(preFilledSchedule);
        this.setState({ preFilledSchedule, schedule });
        this.props.onChange(schedule);
    }

    onUnavailabilityTimeChange(index, unavIndex, type, time) {
        const preFilledSchedule = [].concat(this.state.preFilledSchedule);
        preFilledSchedule[index].isModified = true;
        preFilledSchedule[index].unavailability[unavIndex][type] = time ? time.format('HH:mm') : null;
        const schedule = this.getSchedule(preFilledSchedule);
        this.setState({ preFilledSchedule, schedule });
        this.props.onChange(schedule);
    }

    renderBreaks(unav, index, unavIndex) {
        if (this.state.preFilledSchedule[index].disabled) {
            return null;
        }
        return (
            <Row className="break-row" key={`unav-${index}-${unavIndex}`}>
                <Col md={24}>
                    <span className={'timelabel'}>From: </span>
                    <TimePicker
                        placeholder="From"
                        size="middle"
                        format="HH:mm"
                        defaultValue={unav.from ? moment(unav.from, 'HH:mm') : null}
                        disabledMinutes={DateHelper.disableMinutes}
                        onChange={this.onUnavailabilityTimeChange.bind(this, index, unavIndex, 'from')}
                        hideDisabledOptions
                    />
                    <span className={'timelabel'}>To: </span>
                    <TimePicker
                        placeholder="To"
                        size="middle"
                        format="HH:mm"
                        defaultValue={unav.to ? moment(unav.to, 'HH:mm') : null}
                        disabledMinutes={DateHelper.disableMinutes}
                        onChange={this.onUnavailabilityTimeChange.bind(this, index, unavIndex, 'to')}
                        hideDisabledOptions
                    />
                    <Button
                        type="danger"
                        className="ant-btn-md"
                        size="small"
                        onClick={this.deleteUnavailability.bind(this, index, unavIndex)}>
                        <Icon type="delete" /> Remove
                    </Button>
                </Col>
            </Row>
        );
    }

    renderEntry(entry, index) {
        let breakIndex = 0;
        return (
            <div className={'dayschedule'} key={`schedule-${index}`}>
                <Row>
                    <Col md={6} lg={5}>
                        <span className="stylist-date">
                            {moment(entry.date).format('ddd, MMMM Do')}
                        </span>
                        <Switch
                            checkedChildren="In"
                            unCheckedChildren="Off"
                            checked={!entry.disabled}
                            defaultChecked={false}
                            style={{ marginLeft: '20px' }}
                            onChange={this.onDateDisableChange.bind(this, index)} />
                    </Col>
                    {!entry.disabled ?
                        (<Col md={7} lg={6}>
                            <span className={'timelabel'}>From: </span>
                            <TimePicker
                                placeholder="From"
                                size="middle"
                                format="HH:mm"
                                value={entry.from ? moment(entry.from, 'HH:mm') : null}
                                defaultValue={entry.from ? moment(entry.from, 'HH:mm') : null}
                                onChange={this.onTimeChange.bind(this, index, 'from')}
                                disabledMinutes={DateHelper.disableMinutes}
                                hideDisabledOptions
                            />
                            <span className={'timelabel'}>To: </span>
                            <TimePicker
                                placeholder="To"
                                size="middle"
                                format="HH:mm"
                                value={entry.to ? moment(entry.to, 'HH:mm') : null}
                                defaultValue={entry.to ? moment(entry.to, 'HH:mm') : null}
                                onChange={this.onTimeChange.bind(this, index, 'to')}
                                disabledMinutes={DateHelper.disableMinutes}
                                hideDisabledOptions
                            />
                        </Col>) : null
                    }

                    {!entry.disabled && (
                        <Col md={10} lg={13}>
                            {!entry.disabled && entry.unavailability.length > 0 && (
                                <Row>
                                    <Col md={3}>
                                        <strong>Breaks:</strong>
                                    </Col>
                                    <Col md={20}>
                                    { entry.unavailability && (
                                        entry.unavailability.map((unav) => {
                                            const result = this.renderBreaks(unav, index, breakIndex);
                                            breakIndex += 1;
                                            return result;
                                        })
                                    )}
                                    </Col>
                                </Row>
                            )}
                            <Row>
                                <Col md={10} offset={0}>
                                    <Button type="primary" className="ant-btn-md" onClick={this.addUnavailability.bind(this, index)}>
                                        <Icon type="plus-circle-o" /> Add a break
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }

    render() {
        let index = 0;
        return (
            <div>
                {this.state && this.state.preFilledSchedule && (
                    this.state.preFilledSchedule.map((entry) => {
                        const result = this.renderEntry(entry, index);
                        index += 1;
                        return result;
                    })
                )}
            </div>
        );
    }
}

StylistDayByDaySchedule.propTypes = {
    schedule: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

export default StylistDayByDaySchedule;
