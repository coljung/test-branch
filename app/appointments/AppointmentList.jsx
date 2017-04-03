import React, { Component } from 'react';
import { Table, Button, Icon, DatePicker, Row, Col, Form, Popover } from 'antd';
import { Link } from 'react-router';
import DataSelector from '../components/DataSelector';
import moment from 'moment';
import { ROUTE_APPOINTMENTS_LIST } from '../Routes';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
export const ALL_TYPES = 'All types';
export const ALL_STYLISTS = 'All stylists';

// @todo improve React state management
export default class AppointmentList extends Component {

    constructor(props) {
        super(props);
        this.state = this.createState(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.createState(props));
    }

    createState(props) {
        return {
            filters: props.filters,
            showStylistFilter: !(props.stylists === null),
        };
    }

    getStylists() {
        const stl = this.props.stylists.slice(0);
        stl.forEach((s) => { s.name = `${s.first_name} ${s.last_name}`; });
        stl.unshift({ id: ALL_STYLISTS, name: ALL_STYLISTS });
        return stl;
    }

    getTableColumns() {
        const columns = [
            { title: 'Customer #', dataIndex: 'customer_id', key: 'customer_id' },
            {
                title: 'Start at',
                dataIndex: 'start_at',
                key: 'start_at',
                render: startAt => moment(startAt).utcOffset(0).format('LLLL'),
            }, {
                title: 'Duration',
                dataIndex: 'duration',
                key: 'duration',
                render: duration => `${duration} minutes`,
            },
            { title: 'Appointment Type', dataIndex: 'type', key: 'type' },
            {
                title: 'Total',
                dataIndex: 'total_sale',
                key: 'total_sale',
                render: total => total.toFixed(2),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Link to={`${ROUTE_APPOINTMENTS_LIST}/${record.id}`}>
                        <Button size="large">
                            <Icon type="edit"/> Edit Appointment
                        </Button>
                    </Link>
                ),
            },
        ];

        if (this.state.showStylistFilter) {
            columns.splice(3, 0, {
                title: 'Stylist',
                dataIndex: 'stylist',
                key: 'stylist',
                render: stylist => `${stylist.first_name} ${stylist.last_name}`,
            });
        }

        return columns;
    }

    renderItems(obj) {
        const items = obj.items.map(item => <Popover key={item.id} content={item.name} title={<b>{item.sku}</b>}>
                <img
                    style={{ margin: 10, background: 'white', border: '1px solid #ccc' }}
                    height={ 60 }
                    src={item.images[0].replace('__IMAGE_PARAMS__/', 'b_white,c_lpad,g_south,h_60,w_60/c_scale,h_60/v550/')}
                />
            </Popover>,
        );

        if (items.length > 0) {
            return <div style={{ marginLeft: -40 }}>{items}</div>;
        }

        return 'No ItemTable';
    }

    buildPagination() {
        if (this.props.pagination) {
            return {
                total: this.props.pagination.total,
                pageSize: this.props.pagination.per_page,
                onChange: (current) => {
                    this.state.filters.page = current;
                    this.props.onChange(this.state.filters);
                },
            };
        }
        return {};
    }

    onRangeChange(date) {
        this.state.filters.date_from = date[0];
        this.state.filters.date_to = date[1];
        this.state.filters.page = 1;
        this.props.onChange(this.state.filters);
    }

    onTypeChange(type) {
        if (type === ALL_TYPES) {
            type = null;
        }
        this.state.filters.type = type;
        this.state.filters.page = 1;
        this.props.onChange(this.state.filters);
    }

    onStylistChange(id) {
        if (id === ALL_STYLISTS) {
            id = null;
        }

        this.state.filters.stylist_id = id;
        this.state.filters.page = 1;
        this.props.onChange(this.state.filters);
    }

    render() {
        return (
            <div>
                <div style={{ marginBottm: -20 }}>
                    <Row gutter={16}>
                        <Col span={10}>
                            <FormItem label="Date range" labelCol={{ span: 9 }} wrapperCol={{ span: 12 }}>
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'Future appointments': [moment(), null],
                                        'Past appointments': [null, moment()],
                                    }}
                                    defaultValue={[this.state.filters.date_from || moment(), this.state.filters.date_to]}
                                    onChange={this.onRangeChange.bind(this)}/>
                            </FormItem>
                        </Col>
                        {this.state.showStylistFilter ? (
                            <Col span={7}>
                                <DataSelector
                                    label="Stylist"
                                    dataList={this.getStylists()}
                                    default={this.state.filters.stylist_id || ALL_STYLISTS}
                                    onChange={this.onStylistChange.bind(this)}/>
                            </Col>
                        ) : null}
                        <Col span={7}>
                            <DataSelector
                                label="Type"
                                dataList={[{ name: ALL_TYPES }, { name: 'Fitting Session' }, { name: 'Consultation' }, { name: 'Other' }]}
                                valueField="name"
                                default={this.state.filters.type || ALL_TYPES}
                                onChange={this.onTypeChange.bind(this)}/>
                        </Col>
                    </Row>

                </div>

                <Table rowKey={record => record.id}
                       columns={this.getTableColumns()}
                       dataSource={this.props.appointments}
                       pagination={this.buildPagination()}
                       expandedRowRender={this.renderItems.bind(this)}
                       locale={{ emptyText: 'No Appointments Found' }}
                />
            </div>
        );
    }
}

AppointmentList.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    appointments: React.PropTypes.array.isRequired,
    stylists: React.PropTypes.array,
    pagination: React.PropTypes.object,
    filters: React.PropTypes.object.isRequired,
};
