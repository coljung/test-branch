import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCustomer } from './CustomersActions';
import { Select, Card, Row, Col, Form, Button, Icon, Spin } from 'antd';
import CustomerModalForm from './CustomerModalForm';

const Option = Select.Option;

export class CustomersSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomer: props.customer || null,
            createCustomerActive: false,
        };
        this.searching = false;
    }

    componentWillReceiveProps(props) {
        if (props.customers !== this.state.customers) {
            this.searching = false;
        }

        if (props.customers) {
            this.setState({ customers: props.customers });
        }

        if (props.customer !== this.props.customer) {
            this.setState({ selectedCustomer: props.customer });
        }
    }

    onChange(search) {
        if (search.length > 4) {
            this.searching = true;
            this.props.searchCustomer(search);
            this.setState({ customers: [] });
        }
    }

    onSelect(email) {
        const customer = this.state.customers.find(c => c.email === email);
        this.setState({ selectedCustomer: customer });
        this.props.onSelect(customer);
    }

    onCreate(customer) {
        this.setState({ selectedCustomer: customer });
        this.props.onSelect(customer);
    }

    resetState() {
        this.setState({ selectedCustomer: null, createCustomerActive: false });
        this.props.onSelect(null);
    }

    renderCustomerCard() {
        return (
            <div>
                <Card title="Customer" extra={<a onClick={this.resetState.bind(this)}>Change</a>}>
                    <p><b>Id: </b>{this.state.selectedCustomer.id} </p>
                    <p><b>Email: </b>{this.state.selectedCustomer.email} </p>

                    {this.state.selectedCustomer.first_name && this.state.selectedCustomer.last_name ? (
                        <p>
                            <b>Name: </b>{`${this.state.selectedCustomer.first_name} ${this.state.selectedCustomer.last_name}`}
                        </p>
                    ) : null}
                </Card>
                <br />
            </div>
        );
    }

    renderCustomerLocate() {
        const { getFieldDecorator } = this.props.parentForm;
        const children = this.state.customers.map(customer => (
            <Option key={customer.email}>{customer.email}</Option>
        ));

        return (<Spin spinning={this.searching}>
            <Form.Item label='Customer'>
                <Row gutter={12}>

                    <Col span={8}>
                        {getFieldDecorator('customer_id', {
                            rules: [{ required: true, message: 'Please select a customer.' }],
                            onChange: this.onChange.bind(this),
                        })(
                            <Select combobox
                                    style={{ width: '100%', height: 30, lineHeight: 30 }}
                                    filterOption={false}
                                    onSelect={this.onSelect.bind(this)}
                                    placeholder="Search by E-Mail"
                            >
                                {children}
                            </Select>,
                        )}
                    </Col>

                    <Col span={1} style={{ textAlign: 'center' }}>
                        <span>or</span>
                    </Col>

                    <Col span={3}>
                        <Button type="primary" onClick={this.showModal.bind(this)}>
                            <Icon type="user"/>
                            Create new Customer
                        </Button>
                        <CustomerModalForm
                            active={this.state.createCustomerActive}
                            onSave={this.onCreate.bind(this)}
                            onCancel={this.showModal.bind(this)}/>
                    </Col>

                </Row>
            </Form.Item>
        </Spin>);
    }

    showModal() {
        this.setState({ createCustomerActive: !this.state.createCustomerActive });
    }

    render() {
        return (
            <div>
                {this.state.selectedCustomer ? this.renderCustomerCard() : this.renderCustomerLocate()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { customers: state.CustomersReducer.customers.collection };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchCustomer }, dispatch);
}

CustomersSearch.propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    customer: React.PropTypes.object,
    parentForm: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersSearch);
