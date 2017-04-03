import React, { Component } from 'react';
import { Input, Form, Tabs, message } from 'antd';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getStylistDetail, saveStylist, clearStylistState } from './StylistActions';
import { getAppointments } from '../appointments/AppointmentActions';
import BaseForm from '../components/BaseForm';
import AppointmentList from '../appointments/AppointmentList';
import AppointmentCalendar from '../appointments/AppointmentCalendar';
import StylistDayByDaySchedule from './StylistDayByDaySchedule';
import { ROUTE_STYLISTS_LIST } from '../Routes';

export const TAB_GENERAL_INFO = '1';
export const TAB_STYLIST_AVAILABILITY = '2';
export const TAB_APPOINTMENTS_LIST = '3';
export const TAB_APPOINTMENTS_CALENDAR = '4';

export class StylistForm extends Component {

    createInitialState() {
        return {
            editMode: (this.props.params.id !== 'new'),
            activeTab: this.props.params.tab || TAB_GENERAL_INFO,
            stylist: {
                first_name: null,
                last_name: null,
                schedule: [],
            },
            appointments: {
                parametersList: {
                    date_from: moment(),
                    date_to: moment().add({ day: 7 }),
                },
                parametersCalendar: {
                    date: moment(),
                },
            },
        };
    }

    componentWillMount() {
        this.props.clearStylistState();

        this.state = this.createInitialState();
        if (this.state.editMode) {
            this.props.getStylistDetail(this.props.params.id);
            this.onTabChange(this.state.activeTab);
        }
    }

    componentWillReceiveProps(props) {
        if (props.stylist) {
            if (!this.state.editMode) {
                browserHistory.push(`${ROUTE_STYLISTS_LIST}/${props.stylist.id}`);
            } else {
                this.setState({ stylist: props.stylist });
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { validateFields, getFieldValue } = this.props.form;

        validateFields(['first_name', 'last_name'], (error) => {
            if (!error) {
                this.props.saveStylist({
                    id: (this.state.editMode ? this.props.params.id : null),
                    first_name: getFieldValue('first_name'),
                    last_name: getFieldValue('last_name'),
                    store_id: this.props.currentStoreId,
                    schedule: (this.state.stylist.schedule && this.state.stylist.schedule.length > 0)
                        ? this.state.stylist.schedule : null,
                });
            } else {
                Object.keys(error).forEach(prop => message.error(error[prop].errors[0].message));
            }
        });
    }

    onTabChange(newTabKey) {
        if (this.state.editMode) {
            if (newTabKey === TAB_APPOINTMENTS_LIST) {
                this.loadListAppointments(this.state.appointments.parametersList);
            }
            if (newTabKey === TAB_APPOINTMENTS_CALENDAR) {
                this.loadCalendarAppointments(this.state.appointments.parametersCalendar);
            }
        }

        this.setState({ activeTab: newTabKey });
    }

    onChangeSchedule(data) {
        this.state.stylist.schedule = data;
        this.setState({ stylist: Object.assign({}, this.state.stylist) });
    }

    renderAppointments(method) {
        if (this.state.editMode) {
            if (method === TAB_APPOINTMENTS_LIST) {
                return <Tabs.TabPane tab='Appointments list' key={TAB_APPOINTMENTS_LIST}>
                    <AppointmentList stylists={null}
                                     appointments={this.props.appointments}
                                     pagination={this.props.appointmentsPagination}
                                     filters={this.state.appointments.parametersList}
                                     onChange={this.loadListAppointments.bind(this)}/>
                </Tabs.TabPane>;
            }
            if (method === TAB_APPOINTMENTS_CALENDAR) {
                return <Tabs.TabPane tab='Appointments calendar' key={TAB_APPOINTMENTS_CALENDAR}>
                    <AppointmentCalendar appointments={this.props.appointments}
                                         pagination={this.props.appointmentsPagination}
                                         filters={this.state.appointments.parametersCalendar}
                                         onChange={this.loadCalendarAppointments.bind(this)}/>
                </Tabs.TabPane>;
            }
        }

        return null;
    }

    loadListAppointments(params) {
        this.state.appointments.parametersList = params;
        this.loadAppointments(params);
    }

    loadCalendarAppointments(params) {
        params.page = -1;
        this.state.appointments.parametersCalendar = params;
        this.loadAppointments(params);
    }

    loadAppointments(params) {
        const filter = {
            store_id: this.props.currentStoreId,
            stylist_id: this.props.params.id,
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

        this.props.getAppointments(filter);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const title = `${this.state.editMode ? 'Edit' : 'Create'} Stylist`;

        return (
            <BaseForm title={title}
                      onSaveClick={this.handleSubmit.bind(this)}
                      onCancelClick={browserHistory.push.bind(this, ROUTE_STYLISTS_LIST)}
                      showButtons={this.state.activeTab === TAB_GENERAL_INFO || this.state.activeTab === TAB_STYLIST_AVAILABILITY}>
                <Tabs activeKey={this.state.activeTab} onChange={this.onTabChange.bind(this)}>
                    <Tabs.TabPane tab='General information' key={TAB_GENERAL_INFO}>
                        <Form.Item label='First Name' labelCol={{ span: 3 }} wrapperCol={{ span: 9 }} >
                            {getFieldDecorator('first_name', {
                                rules: [{ required: true, message: '"First name" is a required field' }],
                                initialValue: this.state.stylist.first_name,
                            })(
                                <Input id='first_name' />,
                            )}
                        </Form.Item>

                        <Form.Item label='Last Name' labelCol={{ span: 3 }} wrapperCol={{ span: 9 }} >
                            {getFieldDecorator('last_name', {
                                rules: [{ required: true, message: '"Last name" is a required field' }],
                                initialValue: this.state.stylist.last_name,
                            })(
                                <Input id='last_name' />,
                            )}
                        </Form.Item>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Availabilities' key={TAB_STYLIST_AVAILABILITY}>
                        <StylistDayByDaySchedule
                            schedule={this.state.stylist.schedule || []}
                            onChange={this.onChangeSchedule.bind(this)}/>
                    </Tabs.TabPane>

                    {this.renderAppointments(TAB_APPOINTMENTS_LIST)}
                    {this.renderAppointments(TAB_APPOINTMENTS_CALENDAR)}
                </Tabs>
            </BaseForm>
        );
    }
}

function mapStateToProps(state) {
    return {
        stylist: state.StylistReducer.stylist,
        appointments: state.AppointmentReducer.appointments.collection || [],
        appointmentsPagination: state.AppointmentReducer.appointments.meta || { total: 0, per_page: 20 },
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStylistDetail, saveStylist, getAppointments, clearStylistState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(StylistForm));
