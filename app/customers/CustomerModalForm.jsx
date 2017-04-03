import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveCustomer, prepareCreateCustomerForm } from './CustomersActions';
import { Modal, Button, Icon, Form, Input, Col, Row } from 'antd';
const FormItem = Form.Item;

export class CustomerModalForm extends Component {
    constructor(props) {
        super(props);

        this.createInitialState();
    }

    createInitialState() {
        this.state = {
            email: null,
            first_name: null,
            last_name: null,
        };
        this.props.prepareCreateCustomerForm();
        this.props.form.resetFields();
        this.saving = false;
    }

    saveCustomer() {
        const { validateFields } = this.props.form;

        validateFields(null, (error) => {
            if (!error) {
                const { getFieldValue } = this.props.form;
                this.saving = true;
                this.props.saveCustomer({
                    email: getFieldValue('email'),
                    first_name: getFieldValue('first_name'),
                    last_name: getFieldValue('last_name'),
                });
            }
        });
    }

    componentWillReceiveProps(props) {
        if (props.saved_customer && props.saved_customer.id && this.props.active) {
            this.props.onSave(props.saved_customer);
            this.createInitialState();
        }

        // If a save operation failed
        if (props.saved_customer && !props.saved_customer.id) {
            this.props.prepareCreateCustomerForm();
            this.saving = false;
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal title="Create new Customer"
                   visible={this.props.active}
                   onCancel={this.props.onCancel}
                   onOk={this.saveCustomer.bind(this)}
                   confirmLoading={this.saving}
                   okText="Save"
                   cancelText="Close"
                   closable={false}>

                <FormItem label='E-Mail'>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type: 'email', message: 'Please inform a valid e-mail.' }],
                        initialValue: this.state.email || null,
                    })(
                        <Input addonBefore={<Icon type="mail" />} type='text' id='email' />,
                    )}
                </FormItem>

                <Row gutter={12}>
                    <Col span={12}>
                        <FormItem label='First Name'>
                            {getFieldDecorator('first_name', {
                                rules: [{ required: true, message: 'Please inform a first name.' }],
                                initialValue: this.state.first_name || null,
                            })(
                                <Input type='text' id='first_name' />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label='Last Name'>
                            {getFieldDecorator('last_name', {
                                rules: [{ required: true, message: 'Please inform a last name.' }],
                                initialValue: this.state.last_name || null,
                            })(
                                <Input type='text' id='last_name' />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return { saved_customer: state.CustomersReducer.saved_customer };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ saveCustomer, prepareCreateCustomerForm }, dispatch);
}

CustomerModalForm.propTypes = {
    active: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CustomerModalForm));
