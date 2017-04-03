import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, Form, Tabs, Select, message } from 'antd';
import moment from 'moment';
import { getStoreDetail, saveStore, clearStoreState, setCurrentStore } from './StoreActions';
import { getCountries } from '../countries/CountriesActions';
import { ROUTE_STORE_LIST } from '../Routes';
import BaseForm from '../components/BaseForm';
import WeeklySchedule from '../components/WeeklySchedule';
import DayByDaySchedule from '../components/DayByDaySchedule';

export const TAB_GENERAL_INFO = '1';
export const TAB_WEEKLY_SCHEDULE = '2';
export const TAB_HOLIDAYS = '3';
export const TAB_EXTENDED_HOURS = '4';

export class StoreForm extends Component {

    createInitialState() {
        return {
            editMode: (this.props.params.id !== 'new'),
            activeTab: this.props.params.tab || TAB_GENERAL_INFO,
            store: {
                name: null,
                country_code: null,
                schedule: {
                    unavailability: [],
                    custom_schedule: [],
                },
            },
        };
    }

    componentWillMount() {
        this.props.clearStoreState();
        this.props.getCountries();

        this.state = this.createInitialState();
        if (this.state.editMode) {
            this.props.getStoreDetail(this.props.params.id);
        }
    }

    componentWillReceiveProps(props) {
        if (props.store) {
            if (!this.state.editMode) {
                this.props.setCurrentStore(props.store);
                browserHistory.push(`${ROUTE_STORE_LIST}/${props.store.id}`);
            } else {
                this.setState({ store: props.store });
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { validateFields, getFieldValue } = this.props.form;

        validateFields(['name', 'country_code'], (error) => {
            if (!error) {
                this.props.saveStore({
                    id: (this.state.editMode ? this.props.params.id : null),
                    name: getFieldValue('name'),
                    country_code: getFieldValue('country_code'),
                    schedule: this.state.store.schedule,
                });
            } else {
                Object.keys(error).forEach(prop => message.error(error[prop].errors[0].message));
            }
        });
    }

    onTabChange(newTabKey) {
        this.setState({ activeTab: newTabKey });
    }

    onChangeSchedule(method, data) {
        const store = this.state.store;
        if (method === TAB_WEEKLY_SCHEDULE) {
            const unavailability = store.schedule.unavailability || {};
            const customSchedule = store.schedule.custom_schedule || {};
            store.schedule = {};

            Object.keys(data).forEach((prop) => {
                store.schedule[prop] = data[prop];
            });

            store.schedule.unavailability = unavailability;
            store.schedule.custom_schedule = customSchedule;
        }
        if (method === TAB_HOLIDAYS) {
            this.checkSchedule(data);
            store.schedule.unavailability = data;
        }
        if (method === TAB_EXTENDED_HOURS) {
            this.checkSchedule(data);
            store.schedule.custom_schedule = data;
        }

        this.setState({ store: Object.assign({}, store) });
    }

    checkSchedule(scheduleCustom) {
        scheduleCustom.forEach((one) => {
            const day = moment(one.date).format('dddd').toLowerCase();
            if (!this.state.store.schedule[day]) {
                message.warning(`The day '${day}' should be opened on the weekly schedule`);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const title = `${this.state.editMode ? 'Edit' : 'Create'} Store`;

        return (
            <BaseForm title={title} onSaveClick={this.handleSubmit.bind(this)} onCancelClick={browserHistory.push.bind(this, ROUTE_STORE_LIST)}>
                <Tabs activeKey={this.state.activeTab} onChange={this.onTabChange.bind(this)} >
                    <Tabs.TabPane tab='General information' key={TAB_GENERAL_INFO}>
                        <Form.Item label='Store Name' labelCol={{ span: 3 }} wrapperCol={{ span: 9 }}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '"Store Name" is a required field' }],
                                initialValue: this.state.store.name,
                            })(
                                <Input id='name' />,
                            )}
                        </Form.Item>
                        <Form.Item label='Country' labelCol={{ span: 3 }} wrapperCol={{ span: 9 }}>
                            {getFieldDecorator('country_code', {
                                rules: [{ required: true, message: '"Country" is a required field' }],
                                initialValue: this.state.store.country_code,
                            })(
                                <Select id='country_code'>
                                    {this.props.countries.map(country =>
                                        <Select.Option key={country.code} value={country.code}>{country.name}</Select.Option>)}
                                </Select>,
                            )}
                        </Form.Item>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Manage Weekly Schedule' key={TAB_WEEKLY_SCHEDULE}>
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <WeeklySchedule
                                schedule={this.state.store.schedule || {}}
                                onChange={this.onChangeSchedule.bind(this, TAB_WEEKLY_SCHEDULE)} />
                        </Form.Item>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Manage Holidays' key={TAB_HOLIDAYS}>
                        <DayByDaySchedule
                            datePickerStyle={{ width: 190 }}
                            datePickerFormat='dddd, MMMM Do YYYY'
                            schedule={this.state.store.schedule.unavailability || []}
                            onChange={this.onChangeSchedule.bind(this, TAB_HOLIDAYS)}
                            enableFullDaySwitch={true}
                            showUnavailability={false} />
                        <br/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Manage Extended Hours' key={TAB_EXTENDED_HOURS}>
                        <DayByDaySchedule
                            datePickerStyle={{ width: 190 }}
                            datePickerFormat='dddd, MMMM Do YYYY'
                            schedule={this.state.store.schedule.custom_schedule || []}
                            onChange={this.onChangeSchedule.bind(this, TAB_EXTENDED_HOURS)}
                            enableFullDaySwitch={false}
                            showUnavailability={false} />
                        <br/>
                    </Tabs.TabPane>
                </Tabs>
            </BaseForm>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getStoreDetail,
        saveStore,
        clearStoreState,
        getCountries,
        setCurrentStore,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        store: state.StoreReducer.store,
        countries: state.CountriesReducer.countries,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(StoreForm));
