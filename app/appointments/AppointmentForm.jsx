import React, { Component } from 'react';
import { Form, Row, Col, Card } from 'antd';
import BaseFormAppointments from '../components/BaseFormAppointments';
import FloatingCard from './FloatingCard';
import {
    getAppointmentDetail, saveAppointment, showCreateAppointmentForm, getAvailabilities,
    getDurations, getDefaultDuration,
} from './AppointmentActions';
import { getOneCustomer, prepareCustomerSearch } from '../customers/CustomersActions';
import { getFittingRooms } from '../fitting-rooms/FittingRoomActions';
import { getStylists } from '../stylists/StylistActions';
import Notes from '../components/Notes';
import ItemTable from './ItemTable';
import CustomersSearch from '../customers/CustomersSearch';
import DataSelector from '../components/DataSelector';
import StylistAndTimeSelector from './StylistAndTimeSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { find } from 'lodash';
import { ROUTE_APPOINTMENTS_LIST } from '../Routes';

export class AppointmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitialState();

        this.editMode = (this.props.params.id !== 'new');
        if (!this.editMode) {
            this.props.showCreateAppointmentForm();
            this.props.prepareCustomerSearch();
        }
    }

    createInitialState() {
        return {
            id: null,
            customer_id: null,
            customer: null,
            fitting_room_id: null,
            stylist_id: '',
            start_at: null,
            duration: 'default',
            notes: [],
            feedback: [],
            comments: [],
            items: [],
            type: '',
            durations: [],
            defaultDuration: null,
            showItemsModal: false,
            availabilities: {},
        };
    }

    componentDidMount() {
        if (this.editMode) {
            this.props.getAppointmentDetail(this.props.params.id);
        }
        this.props.getDurations();
        this.props.getDefaultDuration(this.state.items.length);
        this.props.getFittingRooms(this.props.currentStoreId, -1);
        this.props.getStylists(this.props.currentStoreId, -1);
    }

    componentWillReceiveProps(props) {
        if (!this.editMode && props.appointment) {
            this.editMode = true;
            this.props.params.id = props.appointment.id;
            // Once new appointment got saved, it is on edit mode
        }

        if (props.saved && !this.props.saved) {
            browserHistory.push(ROUTE_APPOINTMENTS_LIST);
        }

        // receive a new appointment
        if (props.appointment && props.appointment.id && this.state.id === null) {
            this.setAppointment(props.appointment);
            this.props.getDefaultDuration(props.appointment.items.length);
            this.getAvailabilities(props.appointment.store_id, props.appointment.stylist_id, props.appointment.duration);
            this.props.getOneCustomer(props.appointment.customer_id);
        }

        if (props.customer) {
            this.setState({ customer: props.customer });
        }

        if (props.defaultDuration !== undefined && props.defaultDuration !== this.state.defaultDuration) {
            this.setDefaultDuration(props.defaultDuration);
        }

        if (props.durations) {
            this.setDurations(props.durations);
        }

        if (props.currentStoreId !== this.props.currentStoreId) {
            this.props.getFittingRooms(props.currentStoreId, -1);
            this.props.getStylists(props.currentStoreId, -1);
            this.getAvailabilities(props.currentStoreId, this.state.stylist_id, this.state.duration);
        }
    }

    setDefaultDuration(defaultDuration) {
        this.setState({ defaultDuration });
        this.state.defaultDuration = defaultDuration;
        if (this.state.duration === 'default' && this.props.currentStoreId !== null) {
            this.getAvailabilities(this.props.currentStoreId, this.state.stylist_id, this.state.duration);
        }
    }

    setAppointment(appointment) {
        this.setState({
            id: appointment.id,
            fitting_room_id: appointment.fitting_room_id,
            customer_id: appointment.customer_id,
            stylist_id: appointment.stylist_id,
            start_at: appointment.start_at,
            duration: appointment.duration,
            notes: appointment.notes,
            feedback: appointment.feedback,
            comments: appointment.comments,
            items: appointment.items,
            type: appointment.type,
        });
    }

    setDurations(durations) {
        const values = durations.map(duration => ({ value: duration, name: duration }));
        if (this.state.defaultDuration !== null) {
            values.unshift({ name: `Auto (${this.state.defaultDuration})`, value: 'default' });
        }
        this.setState({ durations: values });
    }

    getAvailabilities(storeId, stylistId, duration) {
        duration = duration === 'default' ? this.state.defaultDuration : duration;
        this.props.getAvailabilities(storeId, stylistId, duration);
    }

    getStylistName() {
        if (this.state.stylist_id) {
            const stylist = this.props.stylists.find(s => s.id === parseInt(this.state.stylist_id, 10));
            return stylist ? `${stylist.first_name} ${stylist.last_name}` : '';
        }
        return 'Any stylist';
    }

    getFittingRoomName() {
        if (this.state.fitting_room_id) {
            const fittingRoom = this.props.fittingRooms.find(s => s.id === parseInt(this.state.fitting_room_id, 10));
            return fittingRoom ? fittingRoom.name : '';
        }
        return '';
    }

    handleSubmit(e) {
        e.preventDefault();
        const { validateFieldsAndScroll } = this.props.form;

        // @todo does not seem to scroll
        validateFieldsAndScroll(null, (error) => {
            if (!error) {
                const { getFieldValue } = this.props.form;

                this.props.saveAppointment({
                    id: (this.editMode ? this.props.params.id : null),
                    store_id: this.props.currentStoreId,
                    customer_id: this.state.customer_id,
                    fitting_room_id: this.state.fitting_room_id,
                    stylist_id: !this.state.stylist_id ? null : this.state.stylist_id,
                    start_at: this.state.start_at,
                    duration: this.state.duration === 'default' ? this.state.defaultDuration : this.state.duration,
                    notes: this.state.notes,
                    feedback: this.state.feedback,
                    comments: this.state.comments,
                    items: this.state.items,
                    type: this.state.type,
                });
            }
        });
    }

    hasErrors() {
        const { getFieldsError } = this.props.form;
        const errors = getFieldsError();

        let hasErrors = false;
        Object.keys(errors).forEach((error) => {
            if (errors[error] !== undefined) {
                hasErrors = true;
            }
        });

        return hasErrors;
    }

    onNoteChange(notes) {
        this.setState({ notes });
    }

    onCommentsChange(comments) {
        this.setState({ comments });
    }

    onFittingRoomChange(fittingRoomIdentifier) {
        this.setState({ fitting_room_id: fittingRoomIdentifier });
    }

    onItemsChange(items) {
        this.setState({ items });
        this.props.getDefaultDuration(items.length);
        this.getAvailabilities(this.props.currentStoreId, this.state.stylist_id, this.state.duration);
    }

    onTypeChange(type) {
        this.setState({ type });
    }

    onChangeStylist(stylistId) {
        stylistId = stylistId.length ? parseInt(stylistId, 10) : '';
        this.setState({ stylist_id: stylistId });
        this.getAvailabilities(this.props.currentStoreId, stylistId, this.state.duration);
    }

    onChangeTime(day, time) {
        if (day !== null && time !== null) {
            this.setState({ start_at: moment(`${day} ${time} +00:00`, 'YYYY-MM-DD HH:mm Z').toISOString() });
        } else {
            this.setState({ start_at: null });
        }
    }

    onDurationChange(duration) {
        duration = duration === 'default' ? duration : parseInt(duration, 10);
        this.setState({ duration });
        this.getAvailabilities(this.props.currentStoreId, this.state.stylist_id, duration);
    }

    onCustomerSelect(customer) {
        if (customer) {
            this.setState({ customer_id: customer.id, customer });
        } else {
            this.setState({ customer_id: null, customer: null });
        }
    }

    render() {
        let title = 'Create new Appointment';
        if (this.editMode) {
            title = 'Edit Appointment';
        }

        return (
            <BaseFormAppointments
                title={title}
                hasErrors={this.hasErrors.bind(this)}
                onSaveClick={this.handleSubmit.bind(this)}
                onCancelClick={browserHistory.push.bind(this, ROUTE_APPOINTMENTS_LIST)}>

                <FloatingCard
                    customerEmail={this.state.customer ? this.state.customer.email : null}
                    type={this.state.type}
                    fittingRoom={this.getFittingRoomName()}
                    duration={this.state.duration === 'default' ? `Auto (${this.state.defaultDuration})` : this.state.duration}
                    stylist={this.getStylistName()}
                    startAt={this.state.start_at ? moment.utc(this.state.start_at).format('ddd, MMM Do YYYY HH:mm') : ''}
                />
                <div className="board-app">

                    <Row gutter={20}>
                        <Col span={12} >
                            <Card title="Customer Info">
                                <CustomersSearch parentForm={this.props.form} onSelect={this.onCustomerSelect.bind(this)} customer={this.props.customer} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Appointment Details">
                                <DataSelector
                                    label="Type"
                                    dataList={[{ name: 'Fitting Session' }, { name: 'Consultation' }, { name: 'Other' }]}
                                    default={this.state.type}
                                    valueField="name"
                                    onChange={this.onTypeChange.bind(this)} />
                                <DataSelector
                                    label="Fitting Room"
                                    dataList={this.props.fittingRooms}
                                    default={this.state.fitting_room_id === null ? '' : this.state.fitting_room_id}
                                    onChange={this.onFittingRoomChange.bind(this)} />
                                <DataSelector
                                    label="Duration"
                                    dataList={this.state.durations}
                                    default={this.state.duration}
                                    valueField="value"
                                    descriptionField="name"
                                    onChange={this.onDurationChange.bind(this)} />
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Card title="Products">
                                <ItemTable items={this.state.items} onItemsChange={this.onItemsChange.bind(this)} store_id={this.props.currentStoreId} />
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Card title="Stylist and Calendar">
                                <StylistAndTimeSelector
                                    stylists={this.props.stylists}
                                    availabilities={this.props.availabilities}
                                    stylist_id={this.state.stylist_id}
                                    onChangeStylist={this.onChangeStylist.bind(this)}
                                    onChangeTime={this.onChangeTime.bind(this)}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Card title="Notes (private)">
                                <Notes label='Notes' onChange={this.onNoteChange.bind(this)} content={this.state.notes} placeholder='Insert note here' />
                            </Card>
                        </Col>
                    </Row>
                    {this.editMode &&
                        <Row>
                            <Col span={24}>
                                <Card title="Feedback">
                                    <Notes label='Feedback' readOnly={true} content={this.state.feedback} placeholder='Insert feedback here' />
                                </Card>
                            </Col>
                        </Row>
                    }

                    <Row>
                        <Col span={24}>
                            <Card title="Comments (public)">
                                <Notes label='Comments' onChange={this.onCommentsChange.bind(this)} content={this.state.comments} placeholder='Insert comment here' />
                            </Card>
                        </Col>
                    </Row>

                </div>
            </BaseFormAppointments>
        );
    }
}

function mapStateToProps(state) {
    return {
        appointment: state.AppointmentReducer.appointment,
        saved: state.AppointmentReducer.saved,
        fittingRooms: state.FittingRoomReducer.fittingRooms.collection || [],
        availabilities: state.AppointmentReducer.availabilities || {},
        stylists: state.StylistReducer.stylists.collection || [],
        durations: state.AppointmentReducer.durations || [],
        defaultDuration: state.AppointmentReducer.defaultDuration,
        customer: state.CustomersReducer.customer,
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAppointmentDetail,
        saveAppointment,
        getFittingRooms,
        showCreateAppointmentForm,
        getStylists,
        getAvailabilities,
        getDurations,
        getDefaultDuration,
        getOneCustomer,
        prepareCustomerSearch,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AppointmentForm));
