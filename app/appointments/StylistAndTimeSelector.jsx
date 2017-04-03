import React, { Component } from 'react';
import { Select, Form, Row, Col, Button } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

export default class StylistAndTimeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylist_id: '',
            selectedDay: null,
            selectedTime: null,
        };
    }

    componentWillReceiveProps(props) {
        if (props.stylist_id !== this.props.stylist_id) {
            this.setState({ stylist_id: props.stylist_id });
        }
    }

    onChangeStylist(stylistId) {
        this.setState({ stylist_id: stylistId });
        this.props.onChangeStylist(stylistId);
    }

    onChangeDay(day) {
        this.setState({ selectedDay: day, selectedTime: null });
        this.props.onChangeTime(day, null);
    }

    onChangeTime(time) {
        this.setState({ selectedTime: time });
        this.props.onChangeTime(this.state.selectedDay, time);
    }

    render() {
        const days = Object.keys(this.props.availabilities);

        return (
            <div>
                <FormItem label='Stylist'>
                    <Select value={`${this.state.stylist_id}`} onChange={this.onChangeStylist.bind(this)}>
                        <Option key="any-stylist" value={''}>- Any stylist -</Option>
                        {this.props.stylists.map(s => (
                            <Option key={`${s.id}`} value={`${s.id}`}>{s.first_name} {s.last_name}</Option>
                        ))}
                    </Select>
                </FormItem>
                <Row>
                {days.map((d) => {
                    const availCount = this.props.availabilities[d].filter(h => h.available).length;
                    if (this.state.selectedDay === null && availCount > 0) {
                        this.state.selectedDay = d;
                    }
                    return (
                        <Col xs={3} key={`avail-${d}`}>
                            <Button type={d === this.state.selectedDay ? 'primary' : 'seconday'}
                                    disabled={(availCount === 0)}
                                    onClick={this.onChangeDay.bind(this, d)}
                            >
                                <p>{moment(d, 'YYYY-MM-DD').format('dddd Do')}</p>
                                <p>{availCount} availabilit{availCount > 1 ? 'ies' : 'y'}</p>
                            </Button>
                        </Col>
                    );
                })}
                </Row>
                {days.map(d => (
                    <Row key={`${d}`} data-date={d} style={d === this.state.selectedDay ? { display: 'block' } : {}}>
                    {this.props.availabilities[d].map(av => (
                        <Col key={`${d}${av.time}`} xs={4}>
                            <Button type={d === this.state.selectedDay && av.time === this.state.selectedTime ? 'primary' : 'seconday'}
                                    disabled={!av.available}
                                    onClick={this.onChangeTime.bind(this, av.time)}
                            >
                                {av.time}
                            </Button>
                        </Col>
                    ))}
                    </Row>
                ))}
            </div>
        );
    }
}

StylistAndTimeSelector.propTypes = {
    stylists: React.PropTypes.array.isRequired,
    stylist_id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    availabilities: React.PropTypes.object.isRequired,
    onChangeStylist: React.PropTypes.func.isRequired,
    onChangeTime: React.PropTypes.func.isRequired,
};
